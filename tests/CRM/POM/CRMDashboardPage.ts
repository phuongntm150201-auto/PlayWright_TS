import { BasePage } from "./BasePage"
import {Page, expect} from "@playwright/test"
import { SidebarMenu } from "../components/SidebarMenu";

export class CRMDashboardPage extends BasePage {
    readonly sidebarMenu = new SidebarMenu (this.page);
    private readonly pageLocators = {
        logo:'#logo',
        //search_input
        searchInput: (page:Page) => page.getByRole ('searchbox', {name:'Search', exact:true}),
        dashboardLink: (page:Page) => page.getByRole ('link', {name:'Dashboard'}),
    };

    public element = this.createLocatorGetter (this.pageLocators)

    async expectOnPage(): Promise<void> {
        await expect (this.element ('logo')).toBeVisible();
        await expect (this.element ('dashboardLink')).toBeVisible ({timeout: 10000});
    }

    async navigateMenu (menuText:string) {
        await this.sidebarMenu.clickMenuItem (menuText);
    }

}