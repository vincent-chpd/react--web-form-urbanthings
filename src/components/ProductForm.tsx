import { useState } from "react";
import "../App.css";
import {
    FormControl,
    FormLabel,
    Select,
    Input,
    Textarea,
    Button,
    FormHelperText,
} from "@chakra-ui/react";

type FormDataProps = {
    activationType: string;
    name: string;
    status: string;
    description: string;
    priceRange: string;
    variants: {
        metadata: {
            field0: string;
            field1: string;
            productId: string;
            operatorId: string;
        };
        price: number;
        currency: string;
        name: string;
        description?: string;
        order: number;
        startDate?: Date;
        endDate?: Date;
    }[];
};

const ProductForm = () => {
    const [formData, setFormData] = useState<FormDataProps>({
        activationType: "",
        name: "",
        status: "",
        description: "",
        priceRange: "",
        variants: [],
    });

    const [jsonResponse, setJsonResponse] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onFieldChange = (key: string, value: string) => {
        setFormData((previousData) => ({ ...previousData, [key]: value }));
    };

    const onVariantChange = (
        index: number,
        key: string,
        value: string | number | Date | undefined
    ) => {
        const newVariants = [...formData.variants];
        (newVariants[index] as any)[key] = value;
        setFormData((previousData) => ({
            ...previousData,
            variants: newVariants,
        }));
    };

    const onAddVariant = () => {
        const variantsCount = formData.variants.length;

        setFormData((previousData) => ({
            ...previousData,
            variants: [
                ...previousData.variants,
                {
                    metadata: {
                        field0: "1",
                        field1: "2",
                        productId: Date.now().toString(),
                        operatorId: "12345",
                    },
                    price: 0,
                    currency: "GBP",
                    name: "",
                    description: "",
                    order: variantsCount,
                    startDate: undefined,
                    endDate: undefined,
                },
            ],
        }));
    };

    const handleClick = () => {
        setJsonResponse(JSON.stringify(formData, null, 2));
    };

    const handleErrorMessage = () => {
        setErrorMessage("This field is required");
    };

    return (
        <div className="container">
            <form className="form">
                <div className="formTitle">
                    <h1>Product Form</h1>
                    <img
                        src="https://urbanthings.co/wp-content/uploads/2023/01/UT_wide_white_60h.png"
                        alt=""
                    />
                </div>
                <FormControl isRequired>
                    <FormLabel>Activation Type:</FormLabel>
                    <Select
                        required
                        placeholder="-- Please Select --"
                        onChange={(e) =>
                            onFieldChange("activationType", e.target.value)
                        }
                    >
                        <option>Manual</option>
                        <option>On Purchase</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                        required
                        placeholder="Enter your product name"
                        onChange={(e) => onFieldChange("name", e.target.value)}
                        value={formData.name}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Status:</FormLabel>
                    <Select
                        placeholder="-- Please Select --"
                        onChange={(e) =>
                            onFieldChange("status", e.target.value)
                        }
                        value={formData.status}
                    >
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Archived</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel optionalIndicator>Description</FormLabel>
                    <Textarea
                        placeholder="Describe your product"
                        onChange={(e) =>
                            onFieldChange("description", e.target.value)
                        }
                        value={formData.description}
                    />

                    <FormLabel>Price Range</FormLabel>
                    <Input
                        placeholder="e.g. £2.00  - £20.00"
                        onChange={(e) =>
                            onFieldChange("priceRange", e.target.value)
                        }
                        value={formData.priceRange}
                    />
                    <FormHelperText className="red">* Required</FormHelperText>
                </FormControl>

                {formData.variants.map((variant, index) => (
                    <div
                        key={`form-variant-${index}`}
                        className="variantContainer"
                    >
                        <span className="formTitle">Variant {index + 1}</span>
                        <div>
                            <FormControl isRequired>
                                <FormLabel>Price (GBP)</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="e.g. £2.00"
                                    onChange={(e) =>
                                        onVariantChange(
                                            index,
                                            "price",
                                            e.target.value
                                        )
                                    }
                                    value={variant.price}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder="Enter variant name"
                                    onChange={(e) =>
                                        onVariantChange(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    value={variant.name}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    placeholder="Enter a description (Optional)"
                                    onChange={(e) =>
                                        onVariantChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    value={variant.description}
                                />
                            </FormControl>
                        </div>
                    </div>
                ))}
                <div>
                    <button onClick={onAddVariant} className="addVariantButton">
                        + Add a variant
                    </button>
                </div>
                <div className="buttonContainer">
                    <Button onClick={handleClick}>Submit form </Button>
                    <Button>
                        <a
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                JSON.stringify(formData, null, 2)
                            )}`}
                            download="filename.json"
                        >
                            Download Json
                        </a>
                    </Button>
                </div>
            </form>
            <div className="response">
                <h1>JSON Response</h1>
                <pre>{jsonResponse}</pre>
            </div>
        </div>
    );
};

export default ProductForm;
