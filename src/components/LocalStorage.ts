import {FormData} from "./DataProps.ts";
export const getFormData = (): FormData => {
	const savingFormData: string | null = localStorage.getItem("form-data");
	return savingFormData ? JSON.parse(savingFormData) : {};
}

export const saveFormData = (formData: FormData) =>
	localStorage.setItem("form-data", JSON.stringify(formData));
