<template>
  <div class="header" data-app>
    <v-app-bar fixed app elevate-on-scroll dark>
      <v-app-bar-nav-icon class="logo" href="/" title="Fhirpath Lab Home"
        ><NuxtLogo
      /></v-app-bar-nav-icon>
      <v-toolbar-title>Fhirpath Lab</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="toggleFavourite !== undefined && favourites"
        title="this item is in your favourites list, click to remove"
        @click="clickToggleFavourite()"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="toggleFavourite !== undefined && !favourites"
        title="click to set as a favourite"
        @click="clickToggleFavourite()"
      >
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="0"
            dark
            v-bind="attrs"
            v-on="on"
            class="fl-nav dots"
            title="Expression Sources"
          >
            <span class="fl-refdata">Expression Sources</span
            ><v-icon class="fl-refdata2">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item href="/Library">
              <v-list-item-icon>
                <v-icon left> mdi-library-outline </v-icon>
                Expression Library
              </v-list-item-icon>
            </v-list-item>
            <v-list-item href="/StructureDefinition">
              <v-list-item-title>Structure Definitions</v-list-item-title>
            </v-list-item>
            <v-list-item href="/SearchParameter">
              <v-list-item-title>Search Parameters</v-list-item-title>
            </v-list-item>
            <!-- <v-list-item href="/Questionnaire">
              <v-list-item-title>Questionnaires</v-list-item-title>
            </v-list-item> -->
            <v-list-item href="/SubscriptionTopic">
              <v-list-item-title>Subscription Topics</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn icon small @click="overlay = true" title="Settings">
        <v-icon small>mdi-cog</v-icon>
      </v-btn>

      <template v-if="extended" v-slot:extension>
        <slot name="extension"></slot>
      </template>
      
      <v-btn elevation="0"
        icon
        title="Sign in"
        v-if="OAuthClientId && !loggedIn"
        @click="login()">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>

      <v-menu offset-y v-if="(OAuthClientId && loggedIn)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn elevation="0" class="loggedin-user dots"
            :title="'Name: ' + userName()"
            v-bind="attrs"
            v-on="on"
            
            >
            <!-- v-if="(OAuthClientId && loggedIn)" -->
            <span class="fp-username fl-refdata">{{ userName() }}</span>
            <v-icon right>{{profileIcon()}}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item @click="logout()">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <slot name="extraNavButtons"></slot>
    </v-app-bar>
    <v-overlay :value="overlay"
      ><user-settings @close="closeSettings"
    /></v-overlay>
  </div>
</template>

<style scoped>
.logo:hover img {
  filter: drop-shadow(1px 1px 4px white);
}

.fp-username {
  font-weight: normal;
  text-transform: none;
}

.dots {
  min-width: 0 !important;
  padding: 0 6px !important;
}
.fl-spacer.v-list-item {
  min-height: unset;
}

.fl-spacer.v-list-item > hr {
  margin: 2px 0;
}

.v-toolbar__title {
  /* text-shadow: 1px 1px 0 #000; */
}

.v-list-item--link:link {
  text-decoration: unset;
}
.fl-nav,
.theme--dark.v-btn.v-btn--has-bg {
  background-color: transparent;
  /* text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000; */
}

.v-icon.fl-refdata2 {
  display: none;
}
@media (max-width: 596px) {
  .v-icon.fl-refdata2 {
    display: inline-flex;
  }
  .fl-refdata {
    display: none;
  }
  .loggedin-user >>> .v-icon--left,
  .loggedin-user >>> .v-icon--right {
    margin-right: 4px;
    margin-left: 4px;
  }
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { settings } from "~/helpers/user_settings";
import UserSettings from "./UserSettings.vue";
import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";
import { SMART_KEY } from "fhirclient/lib/settings";

interface IData {
  overlay: boolean;
  loggedIn: boolean;
  user: fhir4.Practitioner | fhir4.Patient | fhir4.RelatedPerson | fhir4.Person | undefined;
  client?: Client;
  OAuthClientId?: string;
}

function parseJwt (token: string): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
export default Vue.extend({
  components: { UserSettings },
  props: {
    extended: { type: Boolean, required: false },
    favourites: { type: Boolean, required: false },
    toggleFavourite: Function,
  },
  async mounted() {
    this.OAuthClientId = settings.getOAuthClientId();
    FHIR.oauth2.ready()
      .then(this.completeOAuthDance)
      .catch(console.error);
  },
  methods: {
    profileIcon():string {
      if (this.user && this.user.gender == "male") return "mdi-face-man";
      if (this.user && this.user.gender == "female") return "mdi-face-woman";
      return "mdi-face-man";
    },
    userName(): string|undefined {
      const savedName = sessionStorage.getItem("SMART_USER_NAME");
      if (savedName) return savedName;
      if (!this.user || !this.user.name) return undefined;
      if (this.user.name.length<=0) return undefined;
      if (this.user.name[0].text) return this.user.name[0].text;
      return `${this.user.name[0].family}, ${this.user.name[0].given?.join(' ')}`;
    },
    async completeOAuthDance(client: Client){
      // this.$root.$props["access_token"] = client.state.tokenResponse?.access_token
      this.client = client;
      this.loggedIn = true;
      if (client.user.id) {
        let savedName = sessionStorage.getItem("SMART_USER_NAME");
        if (!savedName){
          const user = await client.user.read();
          console.log(user);
          this.user = user as any;
          savedName = this.userName() ?? null;
          if (savedName) sessionStorage.setItem("SMART_USER_NAME", savedName);
        }
      }
      console.log(this.client?.state);
      // parseJwt(FHIR.oauth2.options.)
      if (this.$route.query.code){
        // const bun = await client.request<fhir4.Bundle>("Patient");
        // console.log(bun);
        // alert("fresh auth");
      }
    },
    login() {
      const fsUrl = settings.getFhirServerUrl();
      const fsOA = settings.getOAuthClientId();
      FHIR.oauth2.authorize({
        "iss": fsUrl, 
        "client_id": fsOA,
        // "iss": "https://launch.smarthealthit.org/v/r4/fhir", // SMART test server - works
        // "iss": "https://trifolia-fhir.lantanagroup.com/api/fhir/", // TRIFOLIA - not actually open
        // "iss": "https://test.fhir.org/r4b/", // Grahame's test server - auth not working
        // "iss": "https://spark.incendi.no/fhir", // SPARK server - no auth endpoints or smart-configuration
        // "iss": "https://fhir.simplifier.net/r4", // simplifier - no auth endpoints
        // "client_id": "3ab1d54f-b004-48fd-a1b6-eeae73d8858e",
        "scope": "launch openid profile fhirUser patient/*.read",
        "redirectUri": "/",
        "pkceMode": "ifSupported"
      });
    },
    async logout() {
      this.loggedIn = false;
      this.user = undefined;
      const key = await this.client?.environment.getStorage().get(SMART_KEY);
      await this.client?.environment.getStorage().unset(key);
      await this.client?.environment.getStorage().unset(SMART_KEY);
      await this.client?.environment.getStorage().unset("SMART_USER_NAME");
    },
    clickToggleFavourite() {
      if (this.toggleFavourite) this.toggleFavourite();
    },
    closeSettings() {
      this.overlay = false;
      this.$emit("close-settings");
      this.OAuthClientId = settings.getOAuthClientId();
    },
  },
  data: (): IData => ({
    overlay: false,
    loggedIn: false,
    user: undefined,
    OAuthClientId: undefined,
  }),
});
</script>