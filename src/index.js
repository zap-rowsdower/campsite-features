import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import classNames from 'classnames'
import campFeatures from './camp_features'

// Main container component for the feature list
class FeatureList extends React.Component {

    render () {
        // This loops through our campFeatures and creates a new component for each one, passing along the main feature and its subfeatures as props 
        const nodes = campFeatures.map((feature) => 
            <FeatureNode 
                node={feature} 
                children={feature.subfeatures} 
            />
        );

        return (
            <ul className="main-features">
                {nodes}
            </ul>
        )
    }
}

// FeatureNode component outputs the individual feature as a list item and is also where recursion takes place
class FeatureNode extends React.Component {
    constructor () {
        super()
        this.state = {
            isHidden: true
        }
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render () {

        let childnodes = null;
        const nodeClass = classNames('FeatureNode', {
            "present": this.props.node.presence === true,
            "missing": this.props.node.presence === false
        })

        // if children exist, this component will call itself
        if (this.props.children.length > 0) {
            childnodes = this.props.children.map((childnode) => 
                <FeatureNode 
                    node={childnode} 
                    children={childnode.subfeatures} 
                />
            );
        }

        // return the feature and the subfeatures if they exist
        return (
            <li key={this.props.node.id} className={nodeClass} >
                <span>{this.props.node.title}</span>
                { childnodes ? (
                    <div class="subfeature-container">
                        <span onClick={this.toggleHidden.bind(this)}>details</span>
                        <ul>{!this.state.isHidden && childnodes}</ul>
                    </div>
                ) : (null) }
            </li>
        );
    }
}

ReactDOM.render(
    <FeatureList campFeatures={campFeatures} />,
    document.getElementById('features')
)