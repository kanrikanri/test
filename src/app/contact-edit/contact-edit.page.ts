import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service'
import { NavController, NavParams, ToastController } from '@ionic/angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms' 

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.page.html',
  styleUrls: ['./contact-edit.page.scss'],
})
export class ContactEditPage implements OnInit {
  title: string;
  form: FormGroup;
  contact: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuider: FormBuilder,
    private service: ContactService,
    private toast: ToastController
  ) {
    this.contact = this.navParams.data.contact || {};
    this.createForm();
   }

  private setupPageTitle() {
    this.title = this.navParams.data.contact ? 'Alterando contato' : 'Novo contato';
  }

  createForm() {
    this.form = this.formBuider.group({
      key: [this.contact.key],
      name: [this.contact.name, Validators.required],
      tel: [this.contact.tel, Validators.required]
    })
  }

  onSubmit() {
    if(this.form.valid) {
      this.service.save(this.form.value)
      .then(() => {
        this.toast.create({message: 'Contato salvo com sucesso', duration: 3000});
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({message: 'Erro ao salvar o contato', duration: 3000});
        console.error(e);
      })
    }
  }

  ngOnInit() {
  }

}
