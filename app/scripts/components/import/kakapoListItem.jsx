import React from "react";
import Reflux from "reflux";
import Radium from "radium";
import { IntlMixin, FormattedMessage } from "react-intl";
import { History } from "react-router";
import classNames from "classnames";
import { Sounds } from "../../stores";
import SoundItemClass from "../../classes/sound.js";
import { soundActions } from "../../actions";
import { Image } from "../ui";

export default new Radium(React.createClass({
  propTypes: SoundItemClass,
  mixins: [ History, Reflux.connect(Sounds, "sounds"), IntlMixin ],
  handleClick() {
    if (!this.alreadyAdded()) {
      let name = this.getIntlMessage("sounds." + this.props.name.replace(/\s+/g, "_").toLowerCase());
      soundActions.getCustomURL(name, this.props.file, "file", this.props.img);
      this.history.pushState(null, "/downloads");
    }
  },
  getFileName(file) {
    return file.replace(/^.*[\\\/]/, "");
  },
  alreadyAdded() {
    return this.state.sounds.filter(s => this.getFileName(this.props.file) === this.getFileName(s.file)).count() === 1;
  },
  render() {
    return (
      <div className={classNames("kakapo-item", {"disabled": this.alreadyAdded()})} onClick={this.handleClick}>
        <div className="thumbnail">
          <Image img={`../app/images/dark-${this.props.img}`}/>
        </div>
        <span className="title">
          <FormattedMessage message={this.getIntlMessage("sounds." + this.props.name.replace(/\s+/g, "_").toLowerCase())} />
        </span>
    </div>
    );
  }
}));
