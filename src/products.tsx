import { InputNumber,Row,Col,Input } from 'antd';
import * as React from 'react';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import {cols,Products} from '../server'

interface DsProps{
    headCols: cols[],
    handleValue: Function
}
interface DsState {
    productsGroup: Products[],
}
export class ProductsComponent extends React.Component<DsProps,DsState> {
    constructor(props:DsProps) {
        super(props);
        this.state= {
            productsGroup: [{
                name: '',
                price:0,
                packageFee:0,
                num:0
            }] //组数据
        }
    }
    addGroup() {
        const { productsGroup } = this.state;
        const g = productsGroup.concat([{
            name: '',
            price:0,
            packageFee:0,
            num:0
        }]);
        this.setState({
            productsGroup: g
        });
        this.props.handleValue(this.state.productsGroup);
    }
    delGroup(index:number) {
        const { productsGroup } = this.state;
        productsGroup.splice(index, 1);
        this.setState({
            productsGroup: productsGroup
        });
        this.props.handleValue(this.state.productsGroup);
    }
    removeGroupBtn(groupIndex:number,size:number):JSX.Element {
        if (size>1) {
            return (
                <Col span={2}><MinusCircleTwoTone style={{fontSize: 22}} onClick={() => this.delGroup(groupIndex)}/></Col>
            )
        }
    }
    setProductsValue(text:string|number,index:number,headcol:cols):void {
        const { productsGroup } = this.state;
        const alias:string = headcol.alias;
        productsGroup[index][alias]=text;
        this.setState({
            productsGroup: productsGroup
        })
        this.props.handleValue(this.state.productsGroup);
    }
    render(): JSX.Element {
        const {headCols} = this.props;
        const group =  this.state.productsGroup;
        const xs = Math.floor(20/headCols.length);
        return (
            <div className="discountWraper">
                <Row>
                    {headCols.map((headcol,index)=> {
                        return (
                            <Col span={xs} key={index}>{headcol.name}</Col>
                        )
                    })}
                    <Col span={4}></Col>
                </Row>
                {group.map((configs,groupIndex) => {
                    return (
                        <Row style={{paddingTop:10}} key={groupIndex}>
                            {headCols.map((headcol,index)=> {
                                if (headcol.type=="input") {
                                    return (
                                        <Col span={xs} key={index}><Input size="small" onChange={(event)=>this.setProductsValue(event.target.value, groupIndex, headcol)}></Input></Col>
                                    )
                                }
                                return (
                                    <Col span={xs} key={index}><InputNumber size="small" defaultValue={0} min={0} onChange={(value)=>this.setProductsValue(value, groupIndex, headcol)}></InputNumber></Col>
                                )
                            })}
                            <Col span={2}><PlusCircleTwoTone style={{fontSize: 22}} onClick={() => this.addGroup()}/></Col>
                            {this.removeGroupBtn(groupIndex, group.length)}
                        </Row> 
                    )
                })}

            </div>
        )
    }
}