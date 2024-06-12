package skkuse.team7.refactorengine.dto;

import java.util.ArrayList;
import java.util.List;
import skkuse.team7.refactorengine.domain.RefactoringResult;

public record CodePartResponse(Long refactorId, String entireCode, int nRefactorting, List<String> buggyParts, List<String> fixedParts) {

    public static CodePartResponse of(Long refactorId, RefactoringResult result, int nRefactorting, List<String> buggyParts, List<String> fixedParts) {
        return new CodePartResponse(refactorId, result.fixedCode(), nRefactorting, buggyParts, fixedParts);
    }
}
