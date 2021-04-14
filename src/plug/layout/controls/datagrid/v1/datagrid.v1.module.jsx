import styles from './datagrid.v1.module.css';

const Datagrid = ({ _path, style }) => {
    return (
        <div className={styles.root} style={style} path={_path}>
            <table className={styles.instance}>
                <thead>
                    <tr>
                        <th>1</th>
                        <th>1</th>
                        <th>1</th>
                        <th>1</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Sum</td>
                        <td>$180</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};


export default Datagrid;