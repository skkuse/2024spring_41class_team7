package skkuse.team7.refactorengine.dto;

import java.util.List;
import skkuse.team7.refactorengine.domain.RefactoringResult;

public record EntireCodeResponse(String fixedCodeText, List<Integer> nRefactoring) {
    public static EntireCodeResponse of(RefactoringResult result, List<Integer> nRefactoring) {
        return new EntireCodeResponse(result.fixedCode(), nRefactoring);
    }
}
