import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Panel from '../../components/panel';
import LoadingButton from '../../components/loading_button';
import { getPetsAndDefaultMatch } from '../../actions/match';

class Match extends Component {
	componentDidMount(){
		this.props.getMatches();
	}

	render() {
		const { matchIsFetching } = this.props;

		return (
		  <div className="row">
			<div className="col-xs-12 col-sm-3">
			  <Panel title="Mascotas" loading={ matchIsFetching }>
				<ul className="nav nav-pills nav-stacked nav-profile">
				  { console.log("render match") }
				</ul>
			  </Panel>
			</div>
			<div className="col-xs-12 col-sm-9">
			</div>
		  </div>
		)
	}
}

const mapStateToProps = state => {
	return {
		matchIsFetching : state.match.isFetching
	}
}

const mapDispatchToProps = dispatch => {
  return {
	  getMatches: () => dispatch(getPetsAndDefaultMatch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
