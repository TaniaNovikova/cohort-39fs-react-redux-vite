import { useFormik } from "formik"
import * as Yup from "yup"
import { useContext, useState } from "react"
import Alert from "@mui/material/Alert"
import Modal from "components/Modal/Modal"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import { EmployeesContext } from "pages/EmployeesProject/contexts/EmployeesContext"

import {
  UserDataFormContainer,
  InputContainer,
  ButtonContainer,
} from "./styles"
import {
  Employee,
  PagesNavigation,
} from "pages/EmployeesProject/LayoutEmployeesProject/types"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "store/hooks"
import { employeesSliceAction } from "store/redux/employees/employeesSlice"

function CreateEmployeeForm() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const goToEmployeesPage = () => {
    navigate(PagesNavigation.EMPLOYEES)
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name field is required")
      .min(2, "Name field should contain minimum 2 symbols")
      .max(50, "Name field should contain maximum 50 symobols"),
    surName: Yup.string()
      .required("Surame field is required")
      .max(15, "Surname field should contain maximum 15 symobols"),
    age: Yup.number()
      .required("Age field is required")
      .min(1, "Age field should contain minimum 1 symobol")
      .max(999, "Age field should contain maximum 3 symobols"),
    jobPosition: Yup.string().max(
      30,
      "Job Position field should contain maximum 30 symobols",
    ),
  })

  const dispatch = useAppDispatch()
  const createEmployee = employeesSliceAction.createEmployee

  const formik = useFormik<Employee>({
    initialValues: {
      name: "",
      surName: "",
      age: "",
      jobPosition: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,

    // onSubmit: (values, helpers) => {
    //   dispatch(createEmployee(values))
    //   helpers.resetForm()
    //   goToEmployeesPage()
    // },
    onSubmit: (values, helpers) => {gi
      dispatch(createEmployee(values))
      helpers.resetForm()
      setModalOpen(true)
    },
  })

  return (
    <UserDataFormContainer onSubmit={formik.handleSubmit}>
      <InputContainer>
        <Input
          id="name-id"
          name="name"
          type="text"
          placeholder="John"
          label="Name*"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Input
          id="surname-id"
          name="surName"
          type="text"
          placeholder="Johnson"
          label="Surname*"
          value={formik.values.surName}
          onChange={formik.handleChange}
          error={formik.errors.surName}
        />
        <Input
          id="age-id"
          name="age"
          type="number"
          placeholder="25"
          label="Age*"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.errors.age}
        />
        <Input
          id="job-id"
          name="jobPosition"
          type="text"
          placeholder="QA"
          label="Job Position"
          value={formik.values.jobPosition}
          onChange={formik.handleChange}
          error={formik.errors.jobPosition}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          disabled={!formik.dirty || formik.isSubmitting}
          name="Create"
          type="submit"
        />
      </ButtonContainer>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Alert severity="success">Employee added.</Alert>
      </Modal>
    </UserDataFormContainer>
  )
}

export default CreateEmployeeForm
