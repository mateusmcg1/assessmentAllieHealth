import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MessageContainer from "../home/MessageContainer";
import { useEffect, useState } from "react";


export default function UpdateForm(){
    const {id} =  useParams<{id: string}>();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
    })
  const [{ loading, error }, executePut] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/updateUsers/${id}`,
      method: "PUT",
    },
    { manual: true },
  );

  const [{ data}, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`
  );

  useEffect(() => {
    if(data){
        setFormData({
            firstName: data?.users?.first_name,
            lastName: data?.users?.last_name,
            email: data?.users?.email,
            birthdate: data?.users?.birthdate,
        })
    }
    console.log(formData)
  },[data])

  if (loading) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (error) {
    return (
      <MessageContainer>
        <Box>Error loading users</Box>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  const onFormSubmit = async (data: FieldValues) => {
    await executePut({ data: formData });
    navigate('/')
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {error && (
            <Alert severity="error">
              Sorry - there was an error creating the user
            </Alert>
          )}
          <TextField
            label="First Name"
            value={formData.firstName}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
          <TextField
            label="Email"
            value={formData.email}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField
          value={formData.birthdate}
            InputLabelProps={{ shrink: true }}
            label="Birthdate"
            variant="outlined"
            type="date"
            onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            Create User
          </Button>
        </Box>
      </form>
    </>
  );
}