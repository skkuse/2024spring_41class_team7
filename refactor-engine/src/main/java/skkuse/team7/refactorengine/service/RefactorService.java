package skkuse.team7.refactorengine.service;

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import skkuse.team7.refactorengine.domain.RefactoringResult;

@Service
@RequiredArgsConstructor
public class RefactorService {

    public RefactoringResult removeDuplicateGetSize(String content, String sig) {
        boolean isDetected = false;

        String fixedCode = "";
        String buggyPart = "";
        String fixedPart = "";

        int classStartIndex = -1;


        // 코드 분할
        String[] codes = content.toString().split("\n");
        ArrayList<String> lines = new ArrayList<>(Arrays.asList(codes));

        // 검출
        int buggyLine = -1;
        String arrayListVariableName = "";
        String targetName;
        int lineSize = lines.size();

        for(int i=0; i<lineSize; i++) {
            String line = codes[i];
            if(line.contains("public class Buggy")) {
                classStartIndex = i;
                continue;
            }

            Pattern pattern = Pattern.compile("\\bArrayList\\s*<[^>]*>\\s+([a-zA-Z0-9_]+)\\s*=");

            Matcher matcher = pattern.matcher(line);
            if (matcher.find()) {
                arrayListVariableName = matcher.group(1);

                for(int j=i; j<codes.length; j++) {
                    String line2 = codes[j];
                    Pattern sizeMethodPattern = Pattern.compile("\\b" + arrayListVariableName + "\\.size\\(\\)");

                    Matcher sizeMethodMatcher = sizeMethodPattern.matcher(line2);
                    if (sizeMethodMatcher.find()) {
                        if (line2.contains("for") || line2.contains("while")) {
                            buggyLine = j;
                            buggyPart += (j+1) + ": " + line2 + "\n";
                            isDetected = true;
                            break;
                        }
                    }
                }
            }

            if (isDetected) break;
        }

        // 수정

        if (classStartIndex >= 0) lines.set(classStartIndex, "public class Fixed {");
        if(isDetected) {
            int count = countLeadingSpaces(lines.get(buggyLine));

            lines.set(buggyLine, lines.get(buggyLine).replace(arrayListVariableName + ".size()", arrayListVariableName + "Size" + sig));

            StringBuilder builder = new StringBuilder();
            for(int i=0; i<count; i++) {
                builder.append(' ');
            }
            builder.append("int " + arrayListVariableName + "Size" + sig + " = " + arrayListVariableName + ".size();");
            lines.add(buggyLine, builder.toString());

            // get fixed line
            fixedPart += (buggyLine+1) + ":" + lines.get(buggyLine) + "\n";
            fixedPart += (buggyLine+2) + ":" + lines.get(buggyLine+1) + "\n";
        }

        for (int i=0; i<lines.size(); ++i) {
            fixedCode += lines.get(i) + "\n";
        }

         return new RefactoringResult(content, fixedCode, buggyPart, fixedPart);
    }

    private static int countLeadingSpaces(String text) {
        int count = 0;
        for (int i = 0; i < text.length(); i++) {
            if (text.charAt(i) == ' ') {
                count++;
            } else {
                break;
            }
        }
        return count;
    }

    public RefactoringResult removeDuplicatedIf(String inputCode) {

        // 코드 분할
        String[] codes = inputCode.split("\n");
        ArrayList<String> lines = new ArrayList<>(Arrays.asList(codes));
        int classStartIndex = -1;

        //====== my code =======//
        List<Integer> startIfIndexes = new ArrayList<>();
        List<Integer> endIfIndexes = new ArrayList<>();
        List<String> conditions = new ArrayList<>();
        Stack<Integer> s = new Stack<>();
        //====== my code =======//

        /********** my code **********/
        int idx = 0;
        boolean isDuplicatedIfDetect = false;
        int nIf = 0;
        int nNestedIf = 1;
        int startNested = -1;
        int endNested = -1;

        while (!isDuplicatedIfDetect && idx < lines.size()) {
            nIf = 0;
            startIfIndexes.clear();
            endIfIndexes.clear();
            conditions.clear();
            s.clear();

            if(lines.get(idx).contains("public class Buggy")) {
                classStartIndex = idx;
                continue;
            }



            while (idx < lines.size()) {
                String line = lines.get(idx);

                if (line.contains("if(") || line.contains("if (")) {
                    isDuplicatedIfDetect = true;

                    // condition 추출
                    Pattern pattern = Pattern.compile("\\((.*?)\\)");
                    Matcher matcher = pattern.matcher(line);
                    String firstCondition = "";
                    if(matcher.find()) {
                        firstCondition = matcher.group(1);
                    }
                    conditions.add(firstCondition);

                    startIfIndexes.add(idx);
                    endIfIndexes.add(-1);
                    s.push(nIf++);
                }

                if (isDuplicatedIfDetect && line.contains("}")) {
                    int curr = s.peek();
                    s.pop();
                    endIfIndexes.set(curr, idx);
                }

                idx++;
                if (isDuplicatedIfDetect && s.empty())
                    break;
            }

            nNestedIf = 1;

            for (int i = 1; i < nIf; ++i) {
                if (endIfIndexes.get(i - 1) > endIfIndexes.get(i)) {
                    if (nNestedIf == 1) startNested = i - 1;
                    nNestedIf++;
                    endNested = i;
                } else {

                    while (endIfIndexes.get(startNested) > endIfIndexes.get(i)) startNested++;

                    if (startNested != endNested) break;
                    else {
                        nNestedIf = 1;
                        startNested = i;
                        endNested = i;
                    }
                }
            }




            // 중첩된 if 문이 없다면 (nNestedIf=1) 중첩 if 문 탐지 하지 않았으므로 false
            if (startNested == endNested) isDuplicatedIfDetect = false;

//            startIfIndexes.forEach(i -> {
//                System.out.print(i.toString() + " ");
//            });
//            System.out.println();
//
//            endIfIndexes.forEach(i -> {
//                System.out.print(i.toString() + " ");
//            });
//            System.out.println();
            // 중첩된 if 문 사이에 다른 statement가 있는지 검사,
            // 중첩된 if문 사이에 다른 statement가 없는 가장 빠른 if문 열의 시작과 끝을 리턴
            int tmpStartNested = startNested;
            for (int i=startNested+1; i<=endNested; ++i) {
                int start = startIfIndexes.get(i-1);
                int end = startIfIndexes.get(i);
                boolean flag = true;

                // if문 중간에 비어있나? 비어있으면 flag = true
                for (int j=start+1; j<end; ++j) {
                    if (!lines.get(j).trim().equals("")) {
                        flag = false;
                        break;
                    }
                }
                if (flag) break;
                tmpStartNested++;
            }

            int tmpEndNested = tmpStartNested;

            for (int i=tmpStartNested; i<endNested; ++i) {
                int start = startIfIndexes.get(i);
                int end = startIfIndexes.get(i+1);
                boolean flag = false;
                for (int j=start+1; j<end; ++j) {
                    if (!lines.get(j).trim().equals("")) {
                        flag = true;
                        break;
                    }
                }
                if (flag) break;
                tmpEndNested++;
            }

            endNested = tmpEndNested;
            startNested = tmpStartNested;

            if (startNested == endNested) isDuplicatedIfDetect = false;

            // 중첩된 '}'문 사이에 다른 statement가 있는지 검사. 있을 경우 detect는 false
            tmpStartNested = startNested;
            for (int i=startNested+1; i<=endNested; ++i) {
                int start = endIfIndexes.get(i-1);
                int end = endIfIndexes.get(i);
                boolean flag = true;

                // if문 중간에 비어있나? 비어있으면 flag = true
                for (int j=start-1; j>end; --j) {
                    if (!lines.get(j).trim().equals("")) {
                        flag = false;
                        break;
                    }
                }
                if (flag) break;
                tmpStartNested++;
            }

            tmpEndNested = tmpStartNested;
            for (int i=tmpStartNested; i<endNested; ++i) {
                int start = endIfIndexes.get(i);
                int end = endIfIndexes.get(i+1);
                boolean flag = false;
                for (int j=start-1; j>end; --j) {
                    if (!lines.get(j).trim().equals("")) {
                        flag = true;
                        break;
                    }
                }
                if (flag) break;
                tmpEndNested++;
            }

            System.out.println("start:" + tmpStartNested + "~ end:" + tmpEndNested);
            startNested = tmpStartNested;
            endNested = tmpEndNested;

            if (startNested == endNested) isDuplicatedIfDetect = false;

        }
//            System.out.println("nNestedIf: " + nNestedIf);
//
//            startIfIndexes.forEach(i -> System.out.print(i.toString() + " "));
//            System.out.println();
//            endIfIndexes.forEach(i -> System.out.print(i.toString() + " "));
//            System.out.println();
//            conditions.forEach(i -> System.out.print(i + " "));
//            System.out.println();
        // 여기까지 하면 detect 완료

        idx = 0;
        ArrayList<String> newLines = new ArrayList<>();

        String buggyPart = "";
        String fixedPart = "";
        String fixedCode = "";

        if (!isDuplicatedIfDetect) {
            newLines = lines;
            buggyPart = "";
            fixedPart = "";
            fixedCode = inputCode;
            return new RefactoringResult(inputCode, fixedCode, buggyPart, fixedPart);
        }
        else {
            for (String line : lines) {
                newLines.add(line);
            }
            if (classStartIndex >= 0) newLines.set(classStartIndex, "public class Fixed {");
            String totalCoditions = conditions.get(startNested);
            for (int i=startNested+1; i<=endNested; ++i) {
                totalCoditions += " && "+ conditions.get(i);
            }

            // 합쳐진 if 문 추가
            String startIfLine = lines.get(startIfIndexes.get(startNested));
            int nSpace = 0;
            while (startIfLine.charAt(nSpace) == ' ') nSpace++;
            String newIfStmt = "";
            for (int i=0; i<nSpace; ++i) newIfStmt += " ";
            newIfStmt += "if (" + totalCoditions + ") {";
            newLines.set(startIfIndexes.get(startNested), newIfStmt);

            // 중첩된 if() { 제거
            int start = startIfIndexes.get(startNested) + 1;
            int end = startIfIndexes.get(endNested);
            for (int i=start; i<=end; ++i) newLines.set(i, "");

            // 중첩된 } 제거
            start = endIfIndexes.get(endNested);
            end = endIfIndexes.get(startNested) - 1;
            for (int i=start; i<=end; ++i) newLines.set(i, "");
        }

        for (int i=0; i<newLines.size(); ++i) {
            String line = newLines.get(i);
            fixedCode += line + "\n";
        }


        for (int i=0; i<lines.size(); ++i) {
            if (i >= startIfIndexes.get(startNested) && i <=endIfIndexes.get(startNested)) {
                buggyPart += (i+1) + ": " + lines.get(i) + "\n";
                fixedPart += (i+1) + ": " + newLines.get(i) + "\n";
            }
        }

        //********** my code **********//
        return new RefactoringResult(inputCode, fixedCode, buggyPart, fixedPart);

    }

    public RefactoringResult removeDuplicateObjectCreation(String inputCode) {
        boolean isDetected = false;
        int classStartIndex = -1;


        List<PairInt> loops = new ArrayList<>();
        List<Integer> objectCreations = new ArrayList<>();

        String buggyPart = "";
        String fixedPart = "";
        int fixedPartStart = 0;
        int fixedPartEnd = -1;

        // 코드 분할
        String[] codes = inputCode.split("\n");
        ArrayList<String> lines = new ArrayList<>(Arrays.asList(codes));

        // 검출
        int lineSize = lines.size();

        // find object creation
        for(int i=0; i<lineSize; i++) {
            String line = codes[i];
            if (line.contains("public class Buggy")) {
                classStartIndex = i;
                continue;
            }

            Pattern objectPattern = Pattern.compile("\\b[A-Z]\\w*\\s+[a-z]\\w*\\s*=\\s*new\\s+[A-Z]\\w*\\s*\\(\\s*\\)\\s*;");

            Matcher objectMatcher = objectPattern.matcher(line);
            if (objectMatcher.find()) {
//                    objectCreationIndex = i;
                objectCreations.add(i);
            }
        }

        // find for or while
        Stack<Integer> startIdxs = new Stack<>();
        for(int i=0; i<lineSize; i++) {
            String line = codes[i];

            Pattern forPattern = Pattern.compile("\\b(?:for|while)\\s*\\(.*?\\)\\s*\\{");
            Pattern ifPattern = Pattern.compile("\\b(if)\\s*\\(.*?\\)\\s*\\{");
            Matcher forMatcher = forPattern.matcher(line);
            Matcher ifMatcher = ifPattern.matcher(line);
            if (forMatcher.find()) {
//                    System.out.println("loop detected: " + line);
//                    loopCreationIndex = i;
                startIdxs.push(i);
            } else if (ifMatcher.find()) {
                startIdxs.push(-1);
            }
            if (line.trim().equals("}")) {
                if (startIdxs.empty()) continue;
                int start = startIdxs.peek(); startIdxs.pop();
                if (start != -1) {
                    loops.add(new PairInt(start, i));
                }
            }
        }

//            System.out.println(lines.get(objectCreationIndex));
//            System.out.println(lines.get(loopCreationIndex));


        // 수정
        for (int idx=0; idx<objectCreations.size(); ++idx) {
            int objectCreationIdx = objectCreations.get(idx);

            int start = objectCreationIdx;
            int end = objectCreationIdx;

            for (int i=0; i<loops.size(); ++i) {
                int currStart = loops.get(i).first;
                int currEnd = loops.get(i).second;

                if (currStart < objectCreationIdx && objectCreationIdx < currEnd) {
                    if (currStart < start && end < currEnd) {
                        start = currStart;
                        end = currEnd;
                    }
                }
            }

            if (start != objectCreationIdx && end != objectCreationIdx) {

                for (int k=start; k<=end; ++k) {
                    buggyPart += (k+1) + ": " + lines.get(k) + "\n";
                }

                System.out.println(lines.get(objectCreationIdx) + " in " + start +  " ~ " + end);
                String fixedContent = lines.get(objectCreationIdx);

                int nSpace = countLeadingSpaces(lines.get(start));
                lines.set(objectCreationIdx, "##MUSTDELETE##");
                lines.add(start, adjustLeadingWhitespace(fixedContent, nSpace));

                fixedPartStart = start;
                fixedPartEnd = end;

                break;
            }
        }

        if (classStartIndex >= 0) lines.set(classStartIndex, "public class Fixed {");
        lines.removeIf(item -> item.equals("##MUSTDELETE##"));

        if (fixedPartStart <= fixedPartEnd) {
            for (int k=fixedPartStart; k<=fixedPartEnd; ++k) {
                fixedPart += (k+1) + ": " + lines.get(k) + "\n";
            }
        }

        String fixedCode = "";
        for (int i=0; i<lines.size(); ++i) fixedCode += lines.get(i) + "\n";

        return new RefactoringResult(inputCode, fixedCode, buggyPart, fixedPart);
    }

    public static String adjustLeadingWhitespace(String str, int leadingWhitespaceCount) {
        // 현재 문자열의 앞 공백 및 탭 문자를 제거
        String trimmedStr = str.replaceFirst("^[ \\t]+", "");

        // 주어진 수만큼 공백 및 탭 문자를 추가
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < leadingWhitespaceCount; i++) {
            sb.append(' '); // 원하는 경우 ' ' 대신 '\t'를 사용할 수 있습니다.
        }

        // 공백 및 탭 문자를 추가한 뒤 나머지 문자열을 이어붙임
        sb.append(trimmedStr);
        return sb.toString();
    }


}

class PairInt {
    public int first;
    public int second;

    public PairInt(int x, int y) {
        first = x;
        second = y;
    }
}
