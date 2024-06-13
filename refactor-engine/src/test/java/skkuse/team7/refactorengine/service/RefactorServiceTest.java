package skkuse.team7.refactorengine.service;

import static org.junit.jupiter.api.Assertions.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import skkuse.team7.refactorengine.domain.RefactoringResult;

class RefactorServiceTest {

    @DisplayName(".size() 반복 제거 리펙터링 로직 (in for statement)")
    @Test
    public void removeDuplicateGetSizeInForTest() throws Exception {
        RefactorService refactorService = new RefactorService();

        String mockBuggyCode = ""
                + "public class Buggy {\n"
                + "    public static void main(String[] args) {\n"
                + "        ArrayList<String> arr = new ArrayList<>();\n"
                + "        arr.add(\"a\");\n"
                + "        arr.add(\"b\");\n"
                + "        arr.add(\"c\");\n"
                + "        arr.add(\"d\");\n"
                + "        arr.add(\"e\");\n"
                + "        arr.add(\"f\");\n"
                + "        arr.add(\"g\");\n"
                + "        \n"
                + "        for(int i=0; i<arr.size(); i++) {\n"
                + "            System.out.println(\"Hello\");\n"
                + "        }\n"
                + "    }\n"
                + "}";

        String mockFixedCode = ""
                + "public class Fixed {\n"
                + "    public static void main(String[] args) {\n"
                + "        ArrayList<String> arr = new ArrayList<>();\n"
                + "        arr.add(\"a\");\n"
                + "        arr.add(\"b\");\n"
                + "        arr.add(\"c\");\n"
                + "        arr.add(\"d\");\n"
                + "        arr.add(\"e\");\n"
                + "        arr.add(\"f\");\n"
                + "        arr.add(\"g\");\n"
                + "        \n"
                + "        int arrSize = arr.size();\n"
                + "        for(int i=0; i<arrSize; i++) {\n"
                + "            System.out.println(\"Hello\");\n"
                + "        }\n"
                + "    }\n"
                + "}\n";

        String mockBuggyPart = "        for(int i=0; i<arr.size(); i++) {\n";
        String mockFixedPart = "        int arrSize = arr.size();\n"
                + "        for(int i=0; i<arrSize; i++) {\n";

        RefactoringResult refactoringResult = refactorService.removeDuplicateGetSize(mockBuggyCode, "");

        Assertions.assertThat(refactoringResult.buggyCode()).isEqualTo(mockBuggyCode);
        Assertions.assertThat(refactoringResult.buggyPart()).isEqualTo(mockBuggyPart);
        Assertions.assertThat(refactoringResult.fixedCode()).isEqualTo(mockFixedCode);
        Assertions.assertThat(refactoringResult.fixedPart()).isEqualTo(mockFixedPart);
    }

    @DisplayName(".size() 반복 제거 리펙터링 로직 (in while statement)")
    @Test
    public void removeDuplicateGetSizeInWhileTest() throws Exception {
        RefactorService refactorService = new RefactorService();

        String mockBuggyCode = ""
                + "public class Buggy {\n"
                + "    public static void main(String[] args) {\n"
                + "        ArrayList<String> arr = new ArrayList<>();\n"
                + "        arr.add(\"a\");\n"
                + "        arr.add(\"b\");\n"
                + "        arr.add(\"c\");\n"
                + "        arr.add(\"d\");\n"
                + "        arr.add(\"e\");\n"
                + "        arr.add(\"f\");\n"
                + "        arr.add(\"g\");\n"
                + "        int i = 0;\n"
                + "        while(i < arr.size()) {\n"
                + "            i++;\n"
                + "        }\n"
                + "    }\n"
                + "}";

        String mockFixedCode = ""
                + "public class Fixed {\n"
                + "    public static void main(String[] args) {\n"
                + "        ArrayList<String> arr = new ArrayList<>();\n"
                + "        arr.add(\"a\");\n"
                + "        arr.add(\"b\");\n"
                + "        arr.add(\"c\");\n"
                + "        arr.add(\"d\");\n"
                + "        arr.add(\"e\");\n"
                + "        arr.add(\"f\");\n"
                + "        arr.add(\"g\");\n"
                + "        int i = 0;\n"
                + "        int arrSize = arr.size();\n"
                + "        while(i < arrSize) {\n"
                + "            i++;\n"
                + "        }\n"
                + "    }\n"
                + "}\n";

        String mockBuggyPart = "        while(i < arr.size()) {\n";
        String mockFixedPart = "        int arrSize = arr.size();\n"
                + "        while(i < arrSize) {\n";

        RefactoringResult refactoringResult = refactorService.removeDuplicateGetSize(mockBuggyCode, "");

        Assertions.assertThat(refactoringResult.buggyCode()).isEqualTo(mockBuggyCode);
        Assertions.assertThat(refactoringResult.buggyPart()).isEqualTo(mockBuggyPart);
        Assertions.assertThat(refactoringResult.fixedCode()).isEqualTo(mockFixedCode);
        Assertions.assertThat(refactoringResult.fixedPart()).isEqualTo(mockFixedPart);
    }

    @DisplayName("중첩된 if 제거 리펙터링 로직")
    @Test
    public void removeDuplicateIf() throws Exception {
        RefactorService refactorService = new RefactorService();

        String mockBuggyCode = "public class Buggy {\n"
                + "    public static void main(String[] args) {\n"
                + "        boolean cond1 = true;\n"
                + "        boolean cond2 = true;\n"
                + "        boolean cond3 = false;\n"
                + "        boolean cond4 = false;\n"
                + "\n"
                + "        if(cond1) {\n"
                + "            if(cond2) {\n"
                + "                if(cond3) {\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                }\n"
                + "            }\n"
                + "        }\n"
                + "    }\n"
                + "}\n";

        String mockFixedCode = "public class Fixed {\n"
                + "    public static void main(String[] args) {\n"
                + "        boolean cond1 = true;\n"
                + "        boolean cond2 = true;\n"
                + "        boolean cond3 = false;\n"
                + "        boolean cond4 = false;\n"
                + "\n"
                + "        if (cond1 && cond2 && cond3) {\n"
                + "\n"
                + "\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "\n"
                + "\n"
                + "        }\n"
                + "    }\n"
                + "}\n";

        String mockBuggyPart = "        if(cond1) {\n"
                + "            if(cond2) {\n"
                + "                if(cond3) {\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                }\n"
                + "            }\n"
                + "        }\n";

        String mockFixedPart = "        if (cond1 && cond2 && cond3) {\n"
                + "\n"
                + "\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "                    System.out.println(\"Hello\");\n"
                + "\n"
                + "\n"
                + "        }\n";

        RefactoringResult refactoringResult = refactorService.removeDuplicatedIf(mockBuggyCode);

        Assertions.assertThat(refactoringResult.buggyCode()).isEqualTo(mockBuggyCode);
        Assertions.assertThat(refactoringResult.buggyPart()).isEqualTo(mockBuggyPart);
        Assertions.assertThat(refactoringResult.fixedCode()).isEqualTo(mockFixedCode);
        Assertions.assertThat(refactoringResult.fixedPart()).isEqualTo(mockFixedPart);

    }

    @DisplayName("중첩된 if 제거 리펙터링 로직 - 제거할 것이 없는 경우 Buggy 클래스를 그대로 리턴한다.")
    @Test
    public void removeDuplicateIfNoDuplicated() throws Exception {
        RefactorService refactorService = new RefactorService();

        String mockBuggyCode = "public class Buggy {\n"
                + "    public static void main(String[] args) {\n"
                + "        boolean cond1 = true;\n"
                + "        boolean cond2 = true;\n"
                + "        boolean cond3 = false;\n"
                + "        boolean cond4 = false;\n"
                + "\n"
                + "        if(cond1) {\n"
                + "        }\n"
                + "    }\n"
                + "}\n";

        String mockFixedCode = "public class Buggy {\n"
                + "    public static void main(String[] args) {\n"
                + "        boolean cond1 = true;\n"
                + "        boolean cond2 = true;\n"
                + "        boolean cond3 = false;\n"
                + "        boolean cond4 = false;\n"
                + "\n"
                + "        if(cond1) {\n"
                + "        }\n"
                + "    }\n"
                + "}\n";

        String mockBuggyPart = "";

        String mockFixedPart = "";

        RefactoringResult refactoringResult = refactorService.removeDuplicatedIf(mockBuggyCode);

        Assertions.assertThat(refactoringResult.buggyCode()).isEqualTo(mockBuggyCode);
        Assertions.assertThat(refactoringResult.buggyPart()).isEqualTo(mockBuggyPart);
        Assertions.assertThat(refactoringResult.fixedCode()).isEqualTo(mockFixedCode);
        Assertions.assertThat(refactoringResult.fixedPart()).isEqualTo(mockFixedPart);
    }

    @DisplayName("객체 생성 반복 제거 리펙터링 로직")
    @Test
    public void testRemoveDuplicateObjectCreation1() throws Exception {
        String mockBuggyCode =
                  "public class Buggy {\n\n"
                + "    public static void main(String[] args) {\n"
                + "        for(int i=0; i<10; i++) {\n"
                + "            A b = new A();\n"
                + "            int x = 0;\n"
                + "        }\n"
                + "    }\n"
                + "}\n";
        String mockFixedCode =
                  "public class Fixed {\n\n"
                + "    public static void main(String[] args) {\n"
                + "        A b = new A();\n"
                + "        for(int i=0; i<10; i++) {\n"
                + "            int x = 0;\n"
                + "        }\n"
                + "    }\n"
                + "}\n";
        String mockBuggyPart =
                  "        for(int i=0; i<10; i++) {\n"
                + "            A b = new A();\n"
                + "            int x = 0;\n"
                + "        }\n";
        String mockFixedPart =
                  "        A b = new A();\n"
                + "        for(int i=0; i<10; i++) {\n"
                + "            int x = 0;\n"
                + "        }\n";
        RefactorService refactorService = new RefactorService();
        RefactoringResult refactoringResult = refactorService.removeDuplicateObjectCreation(mockBuggyCode);

        Assertions.assertThat(refactoringResult.buggyCode()).isEqualTo(mockBuggyCode);
        Assertions.assertThat(refactoringResult.buggyPart()).isEqualTo(mockBuggyPart);
        Assertions.assertThat(refactoringResult.fixedCode()).isEqualTo(mockFixedCode);
        Assertions.assertThat(refactoringResult.fixedPart()).isEqualTo(mockFixedPart);

    }

}
