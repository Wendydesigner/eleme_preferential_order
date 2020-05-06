import { InputNumber,Row,Col } from 'antd';
import * as React from 'react';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import {cols} from '../server'

interface DsProps{
    headCols: cols[],
    handleValue:Function
}
interface DsState {
    discountGroup: number[][]
}
export class Discount extends React.Component<DsProps,DsState> {
    constructor(props:DsProps) {
        super(props);
        this.state= {
            discountGroup: [
                []
            ]
        }
    }
    addGroup() {
        const { discountGroup } = this.state;
        const g = discountGroup.concat([[]]);
        this.setState({
            discountGroup: g
        });
        this.props.handleValue(this.state.discountGroup);
    }
    delGroup(index:number) {
        const { discountGroup } = this.state;
        discountGroup.splice(index, 1);
        this.setState({
            discountGroup: discountGroup
        });
        this.props.handleValue(this.state.discountGroup);
    }
    removeGroupBtn(groupIndex:number,size:number):JSX.Element {
        if (size>1) {
            return (
                <Col span={2}><MinusCircleTwoTone style={{fontSize: 22}} onClick={() => this.delGroup(groupIndex)}/></Col>
            )
        }
    }
    setDiscountValue(value:number,index:number,headcol:cols):void {
        const { discountGroup } = this.state;
        const alias = headcol.alias=='sum'?0:1;
        discountGroup[index][alias]=value;
        this.setState({
            discountGroup: discountGroup
        })
        this.props.handleValue(this.state.discountGroup);
    }
    render(): JSX.Element {
        const {headCols} = this.props;
        const {discountGroup} = this.state;
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
                {discountGroup.map((configs,groupIndex) => {
                    return (
                        <Row style={{paddingTop:10}} key={groupIndex}>
                            {headCols.map((headcol,index)=> {
                                return (
                                    <Col span={xs} key={index}><InputNumber size="small" defaultValue={0} onChange={(value)=>this.setDiscountValue(value, groupIndex, headcol)}></InputNumber> </Col>
                                )
                            })}
                            <Col span={2}><PlusCircleTwoTone style={{fontSize: 22}} onClick={() => this.addGroup()}/></Col>
                            {this.removeGroupBtn(groupIndex, discountGroup.length)}
                        </Row> 
                    )
                })}

            </div>
        )
    }
}