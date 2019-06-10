import React , { Component } from 'react';
import styles from './index.module.scss';
import defaultImg from '@/img/default.png'
class Ico extends Component {
    static defaultProps = {
        img:defaultImg,
        width:34,
        height:34
    };
    render() {
        return (
            <i className={styles.ico} style={{
                backgroundImage:'url('+this.props.img+')',
                width:this.props.width,
                height:this.props.height,}}></i>
        );
    }
}


export default Ico;