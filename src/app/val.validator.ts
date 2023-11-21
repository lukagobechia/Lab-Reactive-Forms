import { AbstractControl, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidator {

    static noSpaceValidator(control: FormControl) {
        if (control.value != null && control.value.indexOf(' ') != -1) {
            return { noSpaceValidator: true }
        }
        return null;
    }

    static usernameNotAllowed(control: FormControl): Promise<any> | Observable<any> {
        const response = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'admin') {
                    resolve ({ usernameNotAllowed: true })
                } else {resolve(null)}
            }
                ,3000)
        });
        return response;
    }
}