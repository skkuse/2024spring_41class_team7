package skkuse.team7.refactorengine.service;

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

        int classStartIndex = 0;


        // 코드 분할
        String[] codes = content.toString().split("\n");
        ArrayList<String> lines = new ArrayList<>(Arrays.asList(codes));

        // 검출
        int buggyLine = -1;
        String arrayListVariableName = "";
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
        }

        // 수정

        lines.set(classStartIndex, "public class Fixed {");
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

        while (!isDuplicatedIfDetect && idx < lines.size()) {
            nIf = 0;
            startIfIndexes.clear();
            endIfIndexes.clear();
            conditions.clear();
            s.clear();

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
                if (endIfIndexes.get(i - 1) > endIfIndexes.get(i))
                    nNestedIf++;
                else {
                    nNestedIf--;
                    break;
                }
            }
            // 중첩된 if 문이 없다면 (nNestedIf=1) 중첩 if 문 탐지 하지 않았으므로 false
            if (nNestedIf == 1) isDuplicatedIfDetect = false;

            // 중첩된 if 문 사이에 다른 statement가 있는지 검사, 있을 경우 중첩 if문 아니므로 isDetect=false
            for (int i=1; i<nNestedIf; ++i) {
                int start = startIfIndexes.get(i-1);
                int end = startIfIndexes.get(i);
                for (int j=start+1; j<end; ++j) {
                    if (!lines.get(j).trim().equals("")) {
                        isDuplicatedIfDetect = false;
                        break;
                    }
                }
                if (!isDuplicatedIfDetect) break;
            }

            // 중첩된 '}'문 사이에 다른 statement가 있는지 검사. 있을 경우 detect는 false
            for (int i=nNestedIf-1; i>0; i--) {
                int start = startIfIndexes.get(i);
                int end = startIfIndexes.get(i-1);
                for (int j=start+1; j<end; ++j) {
                    if (!lines.get(j).trim().equals("")) {
                        isDuplicatedIfDetect = false;
                        break;
                    }
                }
            }

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

        if (nNestedIf == 1) {
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
            newLines.set(0, "public class Fixed {");
            String totalCoditions = conditions.get(0);
            for (int i=1; i<nNestedIf; ++i) {
                totalCoditions += " && "+ conditions.get(i);
            }

            // 합쳐진 if 문 추가
            String startIfLine = lines.get(startIfIndexes.get(0));
            int nSpace = 0;
            while (startIfLine.charAt(nSpace) == ' ') nSpace++;
            String newIfStmt = "";
            for (int i=0; i<nSpace; ++i) newIfStmt += " ";
            newIfStmt += "if (" + totalCoditions + ") {";
            newLines.set(startIfIndexes.get(0), newIfStmt);

            // 중첩된 if() { 제거
            int start = startIfIndexes.get(0) + 1;
            int end = startIfIndexes.get(nNestedIf-1);
            for (int i=start; i<=end; ++i) newLines.set(i, "");

            // 중첩된 } 제거
            start = endIfIndexes.get(nNestedIf-1);
            end = endIfIndexes.get(0) - 1;
            for (int i=start; i<=end; ++i) newLines.set(i, "");
        }

        for (int i=0; i<newLines.size(); ++i) {
            String line = newLines.get(i);
            fixedCode += line + "\n";
            System.out.println(newLines.get(i));
        }


        for (int i=0; i<lines.size(); ++i) {
            if (i >= startIfIndexes.get(0) && i <=endIfIndexes.get(0)) {
                buggyPart += (i+1) + ": " + lines.get(i) + "\n";
                fixedPart += (i+1) + ": " + newLines.get(i) + "\n";
            }
        }

        //********** my code **********//
        return new RefactoringResult(inputCode, fixedCode, buggyPart, fixedPart);

    }


}
