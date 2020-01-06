import React from 'react';
import PropTypes from 'prop-types';
import config from '@/commons/config-hoc';

/**
 * 根据hasPermission 和code 来判断children是否显示
 * 一般用于前端权限控制是否显示某个按钮等
 */
@config({
    connect: state => ({permissions: state.system.permissions || []}),
})
export default class Permission extends React.Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
        useDisabled: PropTypes.bool,
    };

    static defaultProps = {
        useDisabled: false,
    };

    hasPermission = (code) => {
        const {permissions} = this.props;
        return permissions.includes(code);
    };

    // hasOneOfPermission=()=>{
    //     const {code, permissions} = this.props;
    //
    //     const getCode = permissions.filter(function(v){ return code.indexOf(v) > -1 });
    //
    //     return getCode.length>0
    //
    //
    // }

    render() {
        let {code, useDisabled, children,isNative} = this.props;

        if (!useDisabled) {
            return this.hasPermission(code) ? children : null;
        }


        children = Array.isArray(children) ? children : [children];

        if(!isNative){


            let index=0;
            return children.map((item) => {
                const {items} = item.props;
                const newItems=items.map((single)=>{
                    single.disabled=!this.hasPermission(code[index]);
                    index++;
                });
                return React.cloneElement(
                    item,
                    newItems,
                );
            });

        }



        return children.map((item) => {
            const {key, ref} = item;
            return React.cloneElement(
                item,
                {
                    hidden: !this.hasPermission(code),
                    key,
                    ref,
                }
            );
        });

    }
}
