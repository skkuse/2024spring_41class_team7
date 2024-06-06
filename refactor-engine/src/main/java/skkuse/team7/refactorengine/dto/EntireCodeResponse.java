package skkuse.team7.refactorengine.dto;

import skkuse.team7.refactorengine.domain.RefactoringResult;

public record EntireCodeResponse(String fixedCodeText) {
    public static EntireCodeResponse of(RefactoringResult result) {
        return new EntireCodeResponse(result.fixedCode());
    }
}
