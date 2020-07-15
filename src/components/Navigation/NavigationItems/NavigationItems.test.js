import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach(() => {
        // el argumento de shallow debe ser pasado como jsx
        wrapper = shallow(<NavigationItems />);
    });
    it("deberia mostrar dos elementos <NavigationItem /> si el usuario no inicio sesion", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it("deberia mostrar tres elementos <NavigationItem /> si el usuario inicio sesion", () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it("deberia mostrar el enlace de cerrar sesion si el usuario inicio sesion", () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(
            <NavigationItem link="/logout">
                Cerrar sesión
            </NavigationItem>
        )).toEqual(true);
    });
});