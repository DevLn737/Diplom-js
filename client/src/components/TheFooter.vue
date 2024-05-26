<script setup>
import {
  FwbFooter,
  FwbFooterCopyright,
  FwbFooterLink,
  FwbFooterLinkGroup,
} from "flowbite-vue";
</script>

<template>
  <fwb-footer class="rounded-none">
    <div class="mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
      <fwb-footer-copyright
        by="DevLn737™"
        class="me-10 text-sm text-gray-300 sm:text-center"
        href="/"
      />

      <div class="items mt-4 flex space-x-6 sm:justify-center md:mt-0">
        <fwb-footer-icon href="/" sr-text="Facebook page">
          <i class="fa-brands fa-facebook"></i>
        </fwb-footer-icon>
        <fwb-footer-icon href="/" sr-text="Discord community">
          <i class="fa-brands fa-discord"></i>
        </fwb-footer-icon>
        <fwb-footer-icon href="/" sr-text="Twitter page">
          <i class="fa-brands fa-twitter"></i>
        </fwb-footer-icon>
        <fwb-footer-icon href="/" sr-text="GitHub account">
          <i class="fa-brands fa-github"></i>
        </fwb-footer-icon>
        <fwb-footer-icon href="/" sr-text="Dribbble account">
          <i class="fa-brands fa-dribbble"></i>
        </fwb-footer-icon>
      </div>
    </div>
  </fwb-footer>
</template>
