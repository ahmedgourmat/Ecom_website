import { Box, Button, Input, Link, Text, Select } from "@chakra-ui/react";
import google_logo from "../../Assets/logo-google.svg";
import useCrud from "../../Hooks/useCrud";
import { useState, ChangeEvent } from "react";
import wilayas from "../../Constant/locationData"; // Adjust the path to your wilayas data file
import { useNavigate } from "react-router-dom";

interface SignupProps {
  onToggle: () => void;
}

interface SignupValues {
  name: string;
  email: string;
  password: string;
  location: string;
  numTel: string;
}

export const Signup = ({ onToggle }: SignupProps) => {
  const { post } = useCrud();
  const [values, setValues] = useState<SignupValues>({
    name: "",
    email: "",
    password: "",
    location: "",
    numTel: "",
  });
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");
  const [selectedBaladiya, setSelectedBaladiya] = useState<string>("");
  const [customBaladiya, setCustomBaladiya] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const signupHandler = async () => {
    setLoading(true);
    try {
      const location =
        selectedBaladiya === "Others"
          ? `${selectedWilaya} - ${customBaladiya}`
          : `${selectedWilaya} - ${selectedBaladiya}`;
      console.log({ ...values, location });
      const res = await post("api/v1/user/signup", { ...values, location });
      localStorage.setItem("userToken", res.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const wilayaChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWilaya(e.target.value);
    setSelectedBaladiya(""); // Reset baladiya when wilaya changes
    setCustomBaladiya("");
  };

  const baladiyaChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBaladiya(e.target.value);
    setCustomBaladiya("");
  };

  const customBaladiyaChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomBaladiya(e.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" gap="40px">
      <Box display="flex" flexDirection="column" gap="10px">
        <Text fontWeight="500" fontSize="36px">
          Create an account
        </Text>
        <Text fontWeight="400" fontSize="16px">
          Enter your details below
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="20px">
        <Input
          name="name"
          onChange={changeHandler}
          value={values.name}
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          opacity="40%"
          placeholder="Name"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Input
          name="email"
          onChange={changeHandler}
          value={values.email}
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          opacity="40%"
          placeholder="Email or Phone Number"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Input
          name="password"
          onChange={changeHandler}
          value={values.password}
          type="password"
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          opacity="40%"
          placeholder="Password"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Input
          name="numTel"
          onChange={changeHandler}
          value={values.numTel}
          width="400px"
          border="none"
          borderRadius="0px"
          borderBottom="1.5px solid #000000"
          padding="0px"
          opacity="40%"
          placeholder="Phone number"
          _placeholder={{ color: "#000000" }}
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        />
        <Select
          placeholder="Select Wilaya"
          value={selectedWilaya}
          onChange={wilayaChangeHandler}
          width="400px"
          border="none"
          borderBottom="1.5px solid #000000"
          borderRadius={0}
          cursor="pointer"
          opacity="40%"
          _focus={{
            borderBottom: "1.5px solid #DB4444",
            boxShadow: "none",
          }}
        >
          {wilayas.map((wilaya) => (
            <option key={wilaya.id} value={wilaya.name}>
              {wilaya.name}
            </option>
          ))}
        </Select>
        {selectedWilaya && (
          <Select
            placeholder="Select Baladiya"
            value={selectedBaladiya}
            onChange={baladiyaChangeHandler}
            width="400px"
            border="none"
            borderRadius={0}
            cursor="pointer"
            borderBottom="1.5px solid #000000"
            opacity="40%"
            _focus={{
              borderBottom: "1.5px solid #DB4444",
              boxShadow: "none",
            }}
          >
            {wilayas
              .find((wilaya) => wilaya.name === selectedWilaya)
              ?.baladiyas.map((baladiya) => (
                <option key={baladiya.id} value={baladiya.name}>
                  {baladiya.name}
                </option>
              ))}
            <option value="Others">Others</option>
          </Select>
        )}
        {selectedBaladiya === "Others" && (
          <Input
            name="customBaladiya"
            value={customBaladiya}
            onChange={customBaladiyaChangeHandler}
            placeholder="Enter your Baladiya"
            width="400px"
            border="none"
            borderBottom="1.5px solid #000000"
            opacity="40%"
            _focus={{
              borderBottom: "1.5px solid #DB4444",
              boxShadow: "none",
            }}
          />
        )}
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="20px"
          mt="20px"
        >
          <Button
            bg="#DB4444"
            color="#FAFAFA"
            borderRadius="4px"
            w="100%"
            h="46px"
            fontWeight="400"
            onClick={signupHandler}
            isLoading={loading}
            _hover={{ bg: "#C23333" }}
            _focus={{
              bg: "#DB4444",
              boxShadow: "none",
            }}
          >
            Create Account
          </Button>
          <Button
            bg="#FFFFFF"
            color="#000000"
            borderRadius="4px"
            w="100%"
            h="46px"
            fontWeight="400"
            border="1px solid #323232"
            _hover={{ bg: "#F0F0F0" }}
            _focus={{
              bg: "#FFFFFF",
              boxShadow: "none",
            }}
          >
            <Box display="flex" alignItems="center" gap="10px">
              <img
                src={google_logo}
                alt="Google logo"
                style={{ height: "20px" }}
              />
              <Text>Sign up with Google</Text>
            </Box>
          </Button>
          <Text opacity="70%" textAlign="center">
            Already have an account?{" "}
            <Link
              fontWeight="500"
              color="#DB4444"
              _hover={{ textDecoration: "underline" }}
              onClick={onToggle}
            >
              Log in
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
