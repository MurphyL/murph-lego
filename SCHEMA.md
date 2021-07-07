## `组件`Schema

### 通用属性

```toml
component = "react-json-schema 的组件描述"
data = ["数据抽取方法", "数据引用（AJAX URL/Local Data ID）", "数据Lodash路径"]
[config]
width = "组件宽度"
height = "组件宽度"
[style]
# React 组件 Inline CSS 样式
```

### 图表属性

```toml
[chart]
axis = ["X轴", "Y轴"]
type = "图表类型"
group = "数据分组字段"
```

### 表格属性

```toml
[datagrid]
```