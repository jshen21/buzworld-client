// import React, { Component } from 'react';
// import { Select, Trigger, OptionList, Option, utils } from 'Selectly'
// const { getToggledValues } = utils
 
// class CheckboxMultiSelect extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       defaultSelectedSource: 'Select the ones you trust',
//       selectedSources: []
//     }
//   }
 
//   handleSelect(value) {
//     this.setState({
//       selectedSources: getToggledValues(this.state.selectedSources, value)
//     })
//   }
 
//   render() {
//     const { defaultSelectedSource, selectedSources } = this.state
//     return (
//       <Select
//         multiple
//         onChange={value => this.handleSelect(value)}
//       >
//         <Trigger>
//           { selectedSources.length > 0
//             ? selectedSources.join(', ')
//             : defaultSelectedSource
//           }
//         </Trigger>
//         <OptionList tag="ul" className="select-menu">
//           <Option value="blp">Bloomberg</Option>
//           <Option value="wsj">The Wall Street Journal</Option>
//           <Option value="ft">Finantial Times</Option>
//         </OptionList>
//       </Select>
//     )
//   }
// }

// export default CheckboxMultiSelect