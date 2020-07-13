import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe("<NavigationItems />", () => {
    it("deberia mostrar dos elementos <NavigationItem /> si el usuario no inicio sesion", () => {
        // el argumento de shallow debe ser pasado como jsx
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});