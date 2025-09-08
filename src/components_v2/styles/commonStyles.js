// Common Material-UI styles for forms
export const commonTextFieldStyles = {
    "& .MuiInputBase-root": {
        border: "1px solid #D5D9E2",
        backgroundColor: "#fff",
        borderRadius: "7px",
    },
    "& .MuiInputBase-root::before": {
        border: "none",
    },
    "& .MuiInputBase-root:hover::before": {
        border: "none",
    },
    "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
        border: "none",
    },
};

export const commonSelectStyles = {
    "& .MuiInputBase-root": {
        border: "1px solid #D5D9E2",
        backgroundColor: "#fff",
        borderRadius: "7px",
    },
    "& .MuiInputBase-root::before": {
        border: "none",
    },
    "& .MuiInputBase-root:hover::before": {
        border: "none",
    },
    "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
        border: "none",
    },
};

export const commonButtonStyles = {
    borderRadius: "7px",
    textTransform: "none",
    fontWeight: 500,
};

export const commonFormLabelStyles = {
    fontWeight: "500",
    fontSize: "14px",
    mb: "10px",
    display: "block",
};

export const commonCancelStyles = {
    borderColor: "#D5D9E2",
    color: "#6B7280",
    "&:hover": {
        borderColor: "#9CA3AF",
        backgroundColor: "#F9FAFB",
    },
}

export const commonSubmitStyle = {
    backgroundColor: "#3B82F6",
    "&:hover": {
        backgroundColor: "#2563EB",
    },
    "&:disabled": {
        backgroundColor: "#9CA3AF",
    },
}


export const commonUndefinedLoadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 200px)',
}
