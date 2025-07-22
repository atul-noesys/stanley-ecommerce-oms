// stores/toastStore.ts
import { makeAutoObservable } from 'mobx';
import { toast } from 'sonner';

export class ToastStore {
  constructor() {
    makeAutoObservable(this);
  }

  success(message: string,) {
    toast.success(message);
  }

  error(message: string,) {
    toast.error(message);
  }

  warning(message: string,) {
    toast.warning(message);
  }

  info(message: string,) {
    toast.info(message);
  }
}