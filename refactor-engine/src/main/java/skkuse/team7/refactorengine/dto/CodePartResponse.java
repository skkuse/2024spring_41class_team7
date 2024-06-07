package skkuse.team7.refactorengine.dto;

import skkuse.team7.refactorengine.domain.RefactoringResult;

public record CodePartResponse(Long refactorId, String buggyPart, String fixedPart) {

    public static CodePartResponse of(Long refactorId, RefactoringResult result) {
        return new CodePartResponse(refactorId, result.buggyPart(), result.fixedPart());
    }
}
