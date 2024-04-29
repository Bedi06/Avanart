import { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

import type { AvatarFullConfig } from "../../types";
import type { AvatarListItem } from "./types";

import ReactNiceAvatar, { genConfig } from "react-nice-avatar";

interface AvatarListProps {
  selectConfig: (item: AvatarFullConfig) => void;
}

interface AvatarListState {
  current: number; // Current index for pagination
  avatarConfigList: AvatarListItem[]; // List of avatar configurations
  listWidth?: number; // Width of the avatar list container
}

export default class AvatarList extends Component<
  AvatarListProps,
  AvatarListState
> {
  static propTypes = {
    selectConfig: PropTypes.func.isRequired, // Validate prop types
  };

  listId = "avatarList"; // ID of the avatar list container

  constructor(props: AvatarListProps) {
    super(props);
    // Initialize state with current index and an empty array for avatar configurations

    this.state = {
      current: 0,
      avatarConfigList: [], // Initialize avatarConfigList with an empty array
    };
  }

  componentDidMount() {
    this.fetchListWidth(); // Fetch the width of the avatar list container after component mounts
  }

  // Generate a list of random avatar configurations

  genConfigList(count: number): AvatarListItem[] {
    return new Array(count).fill(null).map(() => ({
      ...genConfig({ isGradient: Boolean(Math.round(Math.random())) }),
      id: "n_" + nanoid(),
    }));
  }

  // Fetch the width of the avatar list container

  fetchListWidth(count = 0) {
    if (count > 20) return; //limited retries
    const listElem = document.getElementById(this.listId);
    if (!listElem) {
      return setTimeout(() => {
        // Retry fetching width after 500 milliseconds if the container is not found
        this.fetchListWidth(count + 1);
      }, 500);
    }

    this.setState({ listWidth: listElem.offsetWidth }); // Set the width in state
  }

  // Handle pagination when changing current index

  changeCurrent = (deg: 1 | -1) => {
    const { current, avatarConfigList } = this.state;
    const newCurrent = Math.max(current + deg, 0);
    const newState: AvatarListState = {
      current: newCurrent,
      avatarConfigList: [],
    };
    if (newCurrent * 10 > avatarConfigList.length - 1) {
      // If reaching end of current avatar configurations, generate new ones

      const newConfigList = this.genConfigList(10);
      newState.avatarConfigList = [...avatarConfigList, ...newConfigList];
    }
    // Update state with new current index and avatar configurations
    this.setState(newState);
  };

  render() {
    const { selectConfig } = this.props;
    const { current, avatarConfigList, listWidth } = this.state;
    const displayMax = (current + 2) * 10; // Calculate maximum index for displayed avatars
    const displayMin = (current - 1) * 10; // Calculate minimum index for displayed avatars

    return (
      <div className="flex items-center justify-center">
        {/* Arrow left */}
        {current !== 0 && (
          <i
            className="iconfont icon-arrow-right-filling-center transform rotate-180 mr-1 text-xl text-gray-500 transition hover:text-white cursor-pointer"
            onClick={() => this.changeCurrent(-1)}
          />
        )}

        {/* Avatar list container */}

        <div id={this.listId} className="AvatarList overflow-x-hidden">
          <div
            className="listWrapper flex items-center py-3"
            style={{
              transform: `translateX(-${current * (listWidth || 0)}px)`,
            }}
          >
            {avatarConfigList.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className="AvatarItemWrapper"
                  onClick={() => selectConfig(item)}
                >
                  {idx >= displayMin && idx < displayMax && (
                    <ReactNiceAvatar className="AvatarItem" {...item} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Render right arrow for pagination if not on last page */}

        <i
          className="iconfont icon-arrow-right-filling-center ml-1 text-xl text-gray-500 transition hover:text-white cursor-pointer"
          onClick={() => this.changeCurrent(1)}
        />
      </div>
    );
  }
}
