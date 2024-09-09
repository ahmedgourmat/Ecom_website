import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import wilayas from "../../Constant/locationData"; // Adjust the path to your wilayas data file
import { UserState } from "../../Hooks/useLogin";
import useCrud from "../../Hooks/useCrud";

export const ProfileInfo = () => {
  // Static state for editing toggle
  const [isEditing, setIsEditing] = useState(false);
  const { user, token, setUser } = UserState() ?? {};

  // State to hold all input values in a single object
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    location: user.location, // We'll set location dynamically
    numTel: user.numTel,
    password: "",
    newPassword: "",
  });

  const [selectedWilaya, setSelectedWilaya] = useState(""); // Store the selected Wilaya
  const [selectedBaladiya, setSelectedBaladiya] = useState(""); // Store the selected Baladiya
  const [customBaladiya, setCustomBaladiya] = useState(""); // Custom Baladiya if "Others" is selected
  const [loading, setLoading] = useState(false);
  const { update } = useCrud();
  const toast = useToast(); // For showing toast notifications

  // Automatically update the location in the values object whenever Wilaya or Baladiya changes
  useEffect(() => {
    if (selectedWilaya) {
      const location =
        selectedBaladiya === "Others"
          ? `${selectedWilaya} - ${customBaladiya}`
          : `${selectedWilaya} - ${selectedBaladiya}`;

      setValues((prevValues) => ({
        ...prevValues,
        location: location,
      }));
    }
  }, [selectedWilaya, selectedBaladiya, customBaladiya]);

  // Handle input change for all inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Toggle between editing and saving state
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle Wilaya change
  const wilayaChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWilaya(e.target.value);
    setSelectedBaladiya(""); // Reset baladiya when wilaya changes
    setCustomBaladiya(""); // Reset custom baladiya
  };

  // Handle Baladiya change
  const baladiyaChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBaladiya(e.target.value);
    setCustomBaladiya(""); // Reset custom baladiya
  };

  // Handle Custom Baladiya input
  const customBaladiyaChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomBaladiya(e.target.value);
  };

  const updateInfo = async () => {
    setLoading(true);
    console.log('here is the values' , values)
    try {
      const res = await update(`api/v1/user/${user._id}`, values, token);
      localStorage.setItem("userInfo", JSON.stringify(res));
      setUser(res);

      // Show success toast notification
      toast({
        title: "Profile updated.",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setIsEditing(false);
    } catch (error: any) {
      // Show error toast notification
      toast({
        title: "Error updating profile.",
        description: error.response?.data?.error || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold">Edit Your Profile</Text>

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Name"
            value={values.name}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Location</FormLabel>
          {isEditing ? (
            <>
              <Select
                placeholder="Select Wilaya"
                value={selectedWilaya}
                onChange={wilayaChangeHandler}
                isDisabled={!isEditing}
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
                  isDisabled={!isEditing}
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
                  placeholder="Enter your Baladiya"
                  onChange={customBaladiyaChangeHandler}
                />
              )}
            </>
          ) : (
            <Input
              name="location"
              placeholder="Location"
              value={values.location}
              isReadOnly
            />
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Phone number</FormLabel>
          <Input
            name="numTel"
            placeholder="Phone number"
            value={values.numTel}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
          />
        </FormControl>

        <Text mt={5} fontSize="md" fontWeight="bold">Password Changes</Text>

        <FormControl>
          <FormLabel>Current Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Current Password"
            value={values.password}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={values.newPassword}
            isReadOnly={!isEditing}
            onChange={handleInputChange}
          />
        </FormControl>

        <Flex mt={4}>
          {isEditing ? (
            <Button
              flex="1"
              mr={2}
              onClick={updateInfo}
              isLoading={loading}
              disabled={loading}
              colorScheme="blue"
            >
              {loading ? <Spinner size="sm" /> : "Save Changes"}
            </Button>
          ) : (
            <Button flex="1" mr={2} onClick={handleEditToggle}>
              Update Profile
            </Button>
          )}
          {isEditing && (
            <Button
              colorScheme="red"
              flex="1"
              onClick={() => setIsEditing(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};
