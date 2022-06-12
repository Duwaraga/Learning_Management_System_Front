import React from "react";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Student(props) {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  var [student, setStudent] = useState([]);


  useEffect(() => {
    axios.get("https://localhost:5001/api/student").then((response) => {
      console.log(response);
      setStudent(response.data);
      console.log(response.data);
    });
  }, [student]);


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      regNo: registrationNumber,
    };
    console.log(data);

    axios.post("https://localhost:5001/api/student", data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            style={{ flex: 0.5 }}
            label="Name"
            name="name"
            id="outlined-start-adornment"
            className=""
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            style={{ flex: 0.5 }}
            label="Registration Number"
            id="outlined-start-adornment"
            className=""
            name="regNo"
            onChange={(e) => setRegistrationNumber(e.target.value)}
            variant="outlined"
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </div>
      </form>


      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              >
                No
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              >
                Registration Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              >
                Name
              </TableCell>

              <TableCell
                style={{ fontWeight: "bold", fontSize: "18px" }}
                align="center"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.regNo}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                
                <Button onClick={() => handleDelete(row.regNo)} type="submit" variant="contained" color="secondary">
                  Delete
                </Button>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}

export default Student;
