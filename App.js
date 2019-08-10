import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native'

let DeviceWidth = Dimensions.get('window').width

export default class App extends React.Component {
  resetBoard(){
    this.setState({
      gridData: [
        {
          position: 1,
          value: null,
          style: { marginBottom: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 2,
          value: null,
          style: { marginBottom: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 3,
          value: null,
          addMove: this.addMove.bind(this),
        },
        {
          position: 4,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 5,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 6,
          value: null,
          style: { marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 7,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 8,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 9,
          value: null,
          style: { marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
      ]
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      nextTurn: 'X',
      gameState: 'intro',
      winner: null,
      mode: null,
      moveCount: 0,
      allowMove: true,
      gridData: [
        {
          position: 1,
          value: null,
          style: { marginBottom: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 2,
          value: null,
          style: { marginBottom: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 3,
          value: null,
          addMove: this.addMove.bind(this),
        },
        {
          position: 4,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 5,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 6,
          value: null,
          style: { marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 7,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 8,
          value: null,
          style: { marginBottom: 2, marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
        {
          position: 9,
          value: null,
          style: { marginLeft: 2 },
          addMove: this.addMove.bind(this),
        },
      ]
    }
  }

  addMove(index) {
    if(this.state.allowMove) {
      let gridData = this.state.gridData
      let item = gridData[index]
      item.value = this.state.nextTurn
      this.setState({
        gridData: gridData,
        nextTurn: this.state.nextTurn === 'X' ? 'O' : 'X',
      })
      //checkWinner
      //horizontal and vertical
      if (index % 3 === 0) {
        if (
            item.value === gridData[index + 1].value &&
            gridData[index + 2].value === gridData[index + 1].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
        if (
            gridData[0].value === gridData[3].value &&
            gridData[3].value === gridData[6].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
      }
      if (index % 3 === 1) {
        if (
            item.value === gridData[index + 1].value &&
            gridData[index - 1].value === gridData[index + 1].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
        if (
            gridData[1].value === gridData[4].value &&
            gridData[4].value === gridData[7].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
      }
      if (index % 3 === 2) {
        if (
            item.value === gridData[index - 1].value &&
            gridData[index - 2].value === gridData[index - 1].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
        if (
            gridData[2].value === gridData[5].value &&
            gridData[5].value === gridData[8].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
      }

      //check diagonal
      if (index % 2 === 0) {
        if (
            item.value === gridData[0].value &&
            gridData[0].value === gridData[4].value &&
            gridData[4].value === gridData[8].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
        if (
            item.value === gridData[2].value &&
            gridData[2].value === gridData[4].value &&
            gridData[4].value === gridData[6].value
        ) {
          this.setState({gameState: 'win', winner: item.value, allowMove: false})
        }
      }
      this.state.moveCount++
      if (this.state.moveCount == 9) {
        this.setState({gameState: 'draw', allowMove: false})
      }
    }
  }

  restartGame() {
    this.resetBoard()
    this.setState({
      allowMove: true,
      gameState: 'play',
      winner: null,
      moveCount: 0,
    })
  }

  renderIntro() {
    return (
      <View>
        <Text style={[styles.text, { marginVertical: 30 }]}>Tic Tac Toe</Text>
        <Button
          title="Start"
          color="white"
          onPress={() => this.setState({ mode: 'single', gameState: 'play' })}
        />
        <Button
          title="About"
          color="white"
          onPress={() => this.setState({ gameState: 'about'})}
        />
      </View>
    )
  }

  renderAbout() {
    return (
      <View>
        <Text
          style={[{marginVertical: 30, textAlign: 'center', color: 'white'}]}
        >
          This app was made by Matthew Lee as a proof of concept. Visit my website below for more!
        </Text>
        <Button
            title="matthewlee.xyz"
            onPress={ ()=>{ Linking.openURL('https://matthewlee.xyz')}}
            color="white"
        />
      </View>
    )
  }

  renderBoard() {
    return (
      <View>
        <Text style={[styles.text, { marginVertical: 30 }]}>
          Next Turn: {this.state.nextTurn}
        </Text>
        <View style={styles.grid}>
          <View>
            <GridItem state={this.state.gridData[0]} index={0} />
            <GridItem state={this.state.gridData[1]} index={1} />
            <GridItem state={this.state.gridData[2]} index={2} />
          </View>
          <View>
            <GridItem state={this.state.gridData[3]} index={3} />
            <GridItem state={this.state.gridData[4]} index={4} />
            <GridItem state={this.state.gridData[5]} index={5} />
          </View>
          <View>
            <GridItem state={this.state.gridData[6]} index={6} />
            <GridItem state={this.state.gridData[7]} index={7} />
            <GridItem state={this.state.gridData[8]} index={8} />
          </View>
        </View>
      </View>
    )
  }

  renderWinner() {
    return (
      <View>
        <Text style={[styles.text, { marginVertical: 30 }]}>
          {this.state.winner} wins!
        </Text>
        <View style={styles.grid}>
          <View>
            <GridItem state={this.state.gridData[0]} index={0} />
            <GridItem state={this.state.gridData[1]} index={1} />
            <GridItem state={this.state.gridData[2]} index={2} />
          </View>
          <View>
            <GridItem state={this.state.gridData[3]} index={3} />
            <GridItem state={this.state.gridData[4]} index={4} />
            <GridItem state={this.state.gridData[5]} index={5} />
          </View>
          <View>
            <GridItem state={this.state.gridData[6]} index={6} />
            <GridItem state={this.state.gridData[7]} index={7} />
            <GridItem state={this.state.gridData[8]} index={8} />
          </View>
        </View>
      </View>
    )
  }

  renderDraw() {
    return (
      <View>
        <Text style={[styles.text, { marginVertical: 30 }]}>
          Draw!
        </Text>
        <View style={styles.grid}>
          <View>
            <GridItem state={this.state.gridData[0]} index={0} />
            <GridItem state={this.state.gridData[1]} index={1} />
            <GridItem state={this.state.gridData[2]} index={2} />
          </View>
          <View>
            <GridItem state={this.state.gridData[3]} index={3} />
            <GridItem state={this.state.gridData[4]} index={4} />
            <GridItem state={this.state.gridData[5]} index={5} />
          </View>
          <View>
            <GridItem state={this.state.gridData[6]} index={6} />
            <GridItem state={this.state.gridData[7]} index={7} />
            <GridItem state={this.state.gridData[8]} index={8} />
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.gameState === 'intro' && this.renderIntro()}
        {this.state.gameState === 'about' && this.renderAbout()}
        {this.state.gameState === 'play' && this.renderBoard()}
        {this.state.gameState === 'win' && this.renderWinner()}
        {this.state.gameState === 'draw' && this.renderDraw()}
        {this.state.gameState !== 'intro' && this.state.gameState !== 'about' && (
          <View style={styles.button}>
            <Button
              title="Restart Game"
              color="white"
              onPress={() => this.restartGame()}
            />
          </View>
        )}
        {this.state.gameState !== 'intro' && (
            <View style={styles.button}>
            <Button
              title="Back"
              color="white"
              onPress={() => this.setState({gameState: 'intro'})}
            />
          </View>
        )}
      </View>
    )
  }
}

class GridItem extends React.Component {
  addMove() {
    this.props.state.value ? null : this.props.state.addMove(this.props.index)
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.item, this.props.state.style]}
        onPress={() => this.addMove()}
      >
        <Text style={styles.text}>{this.props.state.value}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  item: {
    width: DeviceWidth * 0.3,
    height: DeviceWidth * 0.3,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 40,
  },
  button: {
    marginVertical: 25,
  },
  a: {
   color: 'white',
  },
})
