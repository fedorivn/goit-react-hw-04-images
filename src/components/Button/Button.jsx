import PropTypes from 'prop-types'
import { BtnContainer, ButtonStld } from "./Button.styled";

export const Button = ({onLoadMore}) => {
    return ( <BtnContainer>
        <ButtonStld type="button" onClick={onLoadMore}>Load more</ButtonStld>
    </BtnContainer> );
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}
 