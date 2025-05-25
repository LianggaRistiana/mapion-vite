type UserData = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type FieldType = "text" | "email" | "password" | "number" | "textarea" | "select"

type Option = {
  label: string
  value: string | number
}

type FieldConfig = {
  name: string
  label: string
  placeholder?: string
  type?: FieldType
  options?: Option[] // hanya untuk select
  disabled?: boolean
}