import Employee from "../Models/employeeSchema.js";

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(200).json({
      message: "Employee Created Successfully",
      Result: [newEmployee],
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in create Employee" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    res
      .status(200)
      .json({ message: "Employee retrived successfully", Result: [employee] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in get Employee" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const empId = req.params.id;
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).send("Employee Not Found");
    }
    res
      .status(200)
      .json({ message: "Employee retrived successfully", Result: [employee] });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in getById Employee" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
    const {
      employeeFirstName,
      employeeLastName,
      employeeEmail,
      employeeDesignation,
    } = req.body;
    const results = await Employee.updateOne(
      { _id: empId },
      {
        employeeFirstName,
        employeeLastName,
        employeeEmail,
        employeeDesignation,
      }
    );
    if (results.matchedCount === 0) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    const updatedEmployee = await Employee.find({ _id: empId });
    res.status(200).json({
      message: "Employee updated successfully",
      Result: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in edit employee" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
    const deleteEmp = await Employee.deleteOne({ _id: empId });
    if (!deleteEmp) {
      res.status(404).send("Employee details not found");
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error in delete method" });
  }
};
