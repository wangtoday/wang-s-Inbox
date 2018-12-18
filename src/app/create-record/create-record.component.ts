import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CoreHttpService } from "../service/core-http.service";

@Component({
  selector: "app-create-record",
  templateUrl: "./create-record.component.html",
  styleUrls: ["./create-record.component.css"]
})
export class CreateRecordComponent implements OnInit {
  createForm: FormGroup;

  incomeList: any = [];

  submitForm(): void {
    for (const i in this.createForm.controls) {
      this.createForm.controls[i].markAsDirty();
      this.createForm.controls[i].updateValueAndValidity();
    }

    this.coreHttp
      .addDate({
        amount: this.createForm.value.amount,
        type: this.createForm.value.type
      })
      .then(value => {
        console.log("added");
        this.fetchData();
        this.createForm.reset();
      });
  }

  fetchData() {
    this.incomeList = [];
    console.log(this.incomeList);
    this.coreHttp.list().then(value => {
      console.log(value);
      value.forEach(doc => {
        console.log(doc.data());
        this.incomeList.push(doc.data());
      });
    });
  }
  constructor(private coreHttp: CoreHttpService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      amount: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });
    this.fetchData();
  }
}
