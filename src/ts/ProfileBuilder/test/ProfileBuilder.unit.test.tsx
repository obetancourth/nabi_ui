import * as React from 'react';
import { ProfileBuilder } from '../';
import { shallow } from 'enzyme';

describe('ProfileBuilder', () => {
  let wrapper: any;
  let classes: object;
  let theme: object;
  let changeAvatar: any;

  beforeEach(() => {
    changeAvatar = (email: string, avatar: string): void => { console.log( avatar ); };
    wrapper = shallow(
      <ProfileBuilder
        classes={classes}
        theme={theme}
        changeAvatar={changeAvatar}
      />
    );
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
