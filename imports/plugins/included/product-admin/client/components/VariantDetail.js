import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import Grid from "@material-ui/core/Grid";
import { Components } from "@reactioncommerce/reaction-components";
import withProduct from "../hocs/withProduct";
import withVariant from "../hocs/withVariant";
import withVariantForm from "../hocs/withVariantForm";
import ProductList from "./ProductList";
import VariantTable from "./VariantTable";
import ProductHeader from "./ProductHeader";
import VariantForm from "./VariantForm";

/**
 * ProductDetail component
 * @param {Object} props Component props
 * @return {Node} React node
 */
function ProductDetail(props) {
  const {
    option,
    options,
    product,
    variant,
    variants,
    removeVariant,
    restoreVariant,
    cloneVariant,
    onVisibilityButtonClick
  } = props;

  return (
    <Fragment>
      <Components.ProductPublish />
      <Grid item sm={12}>
        <ProductHeader
          product={product}
          option={option}
          variant={variant}
          onCloneVariant={cloneVariant}
          onRemoveVariant={removeVariant}
          onRestoreVariant={restoreVariant}
          onVisibilityChange={onVisibilityButtonClick}
        />
      </Grid>
      <Grid container spacing={24}>
        <Grid item sm={4}>
          <ProductList
            title={option ? "Options" : "Variants"}
            items={option ? options : variants}
          />
        </Grid>
        <Grid item sm={8}>
          <VariantForm {...props} variant={option || variant} />
          {!option && <VariantTable items={props.options} />}
        </Grid>
      </Grid>
    </Fragment>
  );
}

ProductDetail.propTypes = {
  childVariants: PropTypes.arrayOf(PropTypes.object),
  cloneVariant: PropTypes.func,
  onVisibilityButtonClick: PropTypes.func,
  option: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.arrayOf(PropTypes.object),
  product: PropTypes.object,
  removeVariant: PropTypes.func,
  restoreVariant: PropTypes.func,
  variant: PropTypes.object,
  variants: PropTypes.arrayOf(PropTypes.object)
};

export default compose(
  withProduct,
  withVariant,
  withVariantForm
)(ProductDetail);