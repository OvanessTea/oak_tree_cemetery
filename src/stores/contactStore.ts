import { makeAutoObservable, runInAction } from "mobx";
import { ContactType, UpdateContactType } from "@/types/contact.type";
import {
  getContact,
  updateContact,
} from "@/lib/contacts.api";

export class ContactStore {
  contact: ContactType | null = null;
  isLoading = false;
  error: string | null = null;
  notFound: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async setContact(id: string) {
    this.isLoading = true;
    this.error = null;
    this.notFound = false;
    try {
      const contact = await getContact(id);
      runInAction(() => {
        this.contact = contact;
      });
    } catch (e: any) {
      runInAction(() => {
        if (e.response?.status === 404) {
          this.notFound = true;
        } else {
          this.error = e.message || "Ошибка при загрузке компании";
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async updateContact(id: string, data: Partial<UpdateContactType>) {
    this.isLoading = true;
    this.error = null;
    let status: number = 0;
    try {
      const contact = await updateContact(id, data);
      status = 200;
      runInAction(() => {
        this.contact = contact;
      });
    } catch (e: any) {
      status = e.response?.status;
      runInAction(() => {
        this.error = e.message || "Ошибка при обновлении компании";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return status;
  }
}

const contactStore = new ContactStore();
export default contactStore;
