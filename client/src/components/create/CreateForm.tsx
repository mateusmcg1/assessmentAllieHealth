import { Alert, Box, Button, TextField } from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  onSubmit: () => void;
};

const CreateForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm();
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
      method: "POST",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    await executePost({ data });
    window.location.reload();
    onSubmit();
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
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("firstName")}
          />
          <TextField
            label="Last Name"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("lastName")}
          />
          <TextField
            label="Email"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("email")}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Birthdate"
            variant="outlined"
            type="date"
            {...register("birthdate")}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            Create User
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateForm;
