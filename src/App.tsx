import { Routes, Route } from "react-router-dom"

import LayoutEmployeesProject from "pages/EmployeesProject/LayoutEmployeesProject/LayoutEmployeesProject"
import CreateEmployee from "pages/EmployeesProject/CreateEmployee/CreateEmployee"
import Employees from "pages/EmployeesProject/Employees/Employees"
import { PagesNavigation } from "pages/EmployeesProject/LayoutEmployeesProject/types"

// import Homework_15 from "homeworks/Homework_15/Homework_15"
// import Homework_16 from "homeworks/Homework_16/Homework_16"

// import Lesson_16 from "lessons/Lesson_16/Lesson_16"
import Lesson_18 from "lessons/Lesson_18/Lesson_18"

function App() {
  return (
    <>
      {/* <LayoutEmployeesProject>
        <Routes>
          <Route path={PagesNavigation.HOME}></Route>
          <Route
            path={PagesNavigation.CREATE_EMPLOYEES}
            element={<CreateEmployee />}
          />
          <Route path={PagesNavigation.EMPLOYEES} element={<Employees />} />
          <Route path="*" element="Page not found" />
        </Routes>
      </LayoutEmployeesProject> */}

      {/* <Homework_15 /> */}
      {/* <Homework_16 /> */}

      {/* <Lesson_16 /> */}
      <Lesson_18 />
    </>
  )
}

export default App
