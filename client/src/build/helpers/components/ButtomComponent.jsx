import Button from '@mui/material/Button'
import { bool, func, node, string } from 'prop-types'
const ButtomComponent = ({
    variant, component, size, color, onClick, disabled, node,onReset,onSubmit, type
}) => {
    return (
        <Button
            type={type || "button"}
            variant={variant}
            component={component}
            size={size}
            color={color}
            onClick={onClick}
            disabled={disabled}
            fullWidth
            sx={{backgroundColor:"#C7D3ED"}}
            onReset={onReset}
            onSubmit={onSubmit}
        >
            
            {node}
        </Button>
    )
}




ButtomComponent.propTypes={
  variant:string.isRequired,
  component:string,
  onclick:func,
  disabled:bool,
  node:node.isRequired,
  onSubmit:func,
  onreset:func,
  type: string
}

export default ButtomComponent