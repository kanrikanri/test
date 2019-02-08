import { Component } from '@angular/core';
import {ContactService} from '../contact.service'
import { Observable } from 'rxjs';
import { ToastController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contacts: Observable<any>

  constructor(
    public navCtrl: NavController,
    private service: ContactService,
    private toast: ToastController
  ) {}

  newContact() {
    this.navCtrl.navigateRoot('/contact-edit');
  }

  editContact(contact: any) {
    this.navCtrl.navigateForward('/contact-edit/' + contact.key)
  }

  removeContact(key: string) {
    if(key) {
      this.service.remove(key)
      .then(() => {
        this.toast.create({message: 'Contato removido com sucesso', duration: 3000});
      })
      .catch(() => {
        this.toast.create({message: 'Erro ao remover o contato', duration: 3000})
      })
    }
  }
}
