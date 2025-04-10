import { makeAutoObservable, observable, runInAction } from "mobx";
import { CompanyType, UpdateCompanyType } from "@/types/company.type";
import {
  getCompany,
  updateCompany,
  deleteCompany,
  deleteCompanyImage,
  uploadCompanyImage,
} from "@/lib/company.api";

export class CompanyStore {
  @observable company: CompanyType | null = null;
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
    return this.company;
  }

  async updateCompany(id: string, data: Partial<UpdateCompanyType>) {
    this.isLoading = true;
    this.error = null;
    let status: number = 0;
    try {
      const company = await updateCompany(id, data);
      status = 200;
      runInAction(() => {
        this.company = company;
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
      const uploadedImage = await uploadCompanyImage(id, image);
      runInAction(() => {
        this.company = {
          ...this.company!,
          photos: [...this.company!.photos, uploadedImage],
        };
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
      deleteCompanyImage(id, imageId);
      runInAction(() => {
        this.company = {
          ...this.company!,
          photos: this.company!.photos.filter((photo) => photo.name !== imageId),
        };
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
