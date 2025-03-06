import { Box, useColorModeValue, Image, Heading, Text, HStack, IconButton, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
const ProductCard = ({ product }) => {
    //BackGround and textColor for both light modes
    const bg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue('gray.500', 'gray.200')

    //Extracting deleteProduct from global state hook
    const {deleteProduct} = useProductStore()

    //Getting toast (pop-up notifications from chakra)
    const toast = useToast();

	const handleDeleteProduct = async (productId) => {
		const { success, message } = await deleteProduct(productId);
		if (success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};




    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
				{product.name}
			</Heading>
        
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
			${product.price}
		</Text>

        <HStack spacing={2}>
			<IconButton icon={<EditIcon />}  colorScheme='blue' />
			<IconButton
				icon={<DeleteIcon />}
                onClick={() => handleDeleteProduct(product._id)}
				colorScheme='red'
			/>
		</HStack>
        

        </Box>
        </Box>
    );
};

export default ProductCard;