import { useCallback, useMemo, useState } from "react";
import { getAllCategories } from "../axios/categories/categoryApiAxios";
import { useSnackbar } from "../../Providers/SnackBarProvider";

function useFetchCategories() {
  const [Isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoires, setCategoires] = useState(null);
  const [categoy, setCategory] = useState(null);
  const snackMessage = useSnackbar();
  const requestStatusCategories = (categoy, categoires, Isloading, error) => {
    setCategory(categoy);
    setCategoires(categoires);
    setIsLoading(Isloading);
    setError(error);
  };

  const handlleGetAllcategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const categoires = await getAllCategories();
      requestStatusCategories(null, categoires, false, null);
      snackMessage("Categories retrieved successfully.", {
        color: "success",
        variant: "filled",
        duration: 2000,
      });
    } catch (error) {
      snackMessage("Failed to retrieve categories. Please try again.", {
        color: "error",
        variant: "filled",
        duration: 2000,
      });
      requestStatusCategories(null, null, false, error);
    }
  }, []);

  const value = useMemo(() => {
    return { categoires, error, Isloading, categoy };
  }, [categoires, error, Isloading, categoy]);

  return {
    value,
    handlleGetAllcategories,
  };
}

export default useFetchCategories;
