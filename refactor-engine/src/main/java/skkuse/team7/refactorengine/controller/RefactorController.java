package skkuse.team7.refactorengine.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import skkuse.team7.refactorengine.domain.RefactoringResult;
import skkuse.team7.refactorengine.dto.CodePartResponse;
import skkuse.team7.refactorengine.dto.CodeRequest;
import skkuse.team7.refactorengine.dto.EntireCodeResponse;
import skkuse.team7.refactorengine.service.RefactorService;

@AllArgsConstructor
@RestController
// TODO Cross-Origin setting
public class RefactorController {

    private final RefactorService refactorService;

    @PostMapping("/refactoring/{refactorId}")
    public ResponseEntity<CodePartResponse> partialRefactor
            (@RequestBody String request, @PathVariable Long refactorId) {
        RefactoringResult refactoringResult;
        if (refactorId == 1) refactoringResult = refactorService.removeDuplicateGetSize(request, "");
        else if (refactorId == 2) refactoringResult = refactorService.removeDuplicatedIf(request);
        else {
            refactoringResult = new RefactoringResult("", "", "", "");
            return new ResponseEntity<>(CodePartResponse.of(-1L, refactoringResult), HttpStatus.OK);
        }
        return new ResponseEntity<CodePartResponse>(CodePartResponse.of(refactorId, refactoringResult),HttpStatus.OK);
    }

    @PostMapping("/refactoring/all")
    public ResponseEntity<EntireCodeResponse> entireRefactor(@RequestBody String request) {

        Integer sig = 1;
        String currCode = request;
        RefactoringResult refactoringResult = refactorService.removeDuplicateGetSize(currCode, sig.toString());
        while (!refactoringResult.buggyPart().equals("")) {
            sig += 1;
            currCode = refactoringResult.fixedCode();
            refactoringResult = refactorService.removeDuplicateGetSize(currCode, sig.toString());
        }

        currCode = refactoringResult.fixedCode();
        refactoringResult = refactorService.removeDuplicatedIf(currCode);
        while (!refactoringResult.buggyPart().equals("")) {
            currCode = refactoringResult.fixedCode();
            refactoringResult = refactorService.removeDuplicatedIf(currCode);
        }

        return new ResponseEntity<EntireCodeResponse>(EntireCodeResponse.of(refactoringResult), HttpStatus.OK);
    }
}
