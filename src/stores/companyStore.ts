import { makeAutoObservable, runInAction } from "mobx";
import { CompanyType } from "@/types/company.type";
import {
  getCompany,
  updateCompany,
  deleteCompany,
  deleteCompanyImage,
  uploadCompanyImage,
} from "@/lib/company.api";

export class CompanyStore {
  company: CompanyType | null = null;
  isLoading = false;
  error: string | null = null;
  notFound: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async setCompany(id: string) {
    this.isLoading = true;
    this.error = null;
    this.notFound = false;
    try {
      const company = await getCompany(id);
      runInAction(() => {
        this.company = company;
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

  async updateCompany(id: string, data: Partial<CompanyType>) {
    this.isLoading = true;
    this.error = null;
    try {
      const company = await updateCompany(id, data);
      runInAction(() => {
        this.company = company;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Ошибка при обновлении компании";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async deleteCompany(id: string) {
    this.isLoading = true;
    this.error = null;
    try {
      await deleteCompany(id);
      runInAction(() => {
        this.company = null;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Ошибка при удалении компании";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async uploadCompanyImage(id: string, image: File) {
    this.isLoading = true;
    this.error = null;
    try {
      const updatedCompany = await uploadCompanyImage(id, image);
      runInAction(() => {
        this.company = updatedCompany;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Ошибка при загрузке изображения";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async deleteCompanyImage(id: string, imageId: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const updatedCompany = await deleteCompanyImage(id, imageId);
      runInAction(() => {
        this.company = updatedCompany;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Ошибка при удалении изображения";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const companyStore = new CompanyStore();
export default companyStore;
