<template>
	<div
		class="dropdown"
		@click.stop="shouldToggleDropdown"
		:class="computedClasses"
		:style="computedStyles"
	>
		<div class="dropdown-label-container">
			<div class="dropdown-label">
				<span class="text">
					{{ (config && config.prefix ? config.prefix : "") + " "
					}}{{ config && config.placeholder ? config.placeholder : placeholder }}
				</span>
				<i class="angle-down" :class="{ toggled: isExpanded }"></i>
			</div>
		</div>

		<div v-expand="isExpanded" class="options expand">
			<div
				v-for="(i, option) in configOptions"
				:key="'option-' + i"
				class="option"
				@click="setCurrentSelectedOption(option);"
			>
				Y{{ option.value }}Y
			</div>
		</div>
	</div>
</template>





<script>
	export default {
		name: "dropdown",
		data() {
			return {
				isBottomSectionToggled: false,
				optionsHeight: 0,
				optionHeight: 35,
				configOptions: [
					{
						value: "default option"
					}
				],
				backgroundColor: "#cde4f5",
				backgroundExpandedColor: "#fff",
				hoverBackgroundColor: "#0084d4",
				disabledBackgroundColor: "#ccc",
				disabledTextColor: "#555",
				isExpanded: false,
				placeholder: "Placeholder",
				textColor: "black",
				borderRadius: "1.5em",
				border: "1px solid gray",
				width: 180
			};
		},
		components: {},
		props: ["config"],
		computed: {
			computedStyles: function () {
				return [
					{"--options-height": this.optionsHeight + "px"},
					{"--options-height-neg": "-" + this.optionsHeight + "px"},
					{"--option-height": this.optionHeight + "px"},
					{"--main-el-border-radius": this.borderRadius},
					{"--dropdown-width": this.width + "px"},
					{"--dropdown-background-color": this.config.disabled ? this.disabledBackgroundColor : this.backgroundColor},
					{"--dropdown-expanded-color": this.backgroundExpandedColor},
					{"--dropdown-border": this.border},
					{"--dropdown-hover-background-color": this.hoverBackgroundColor},
					{"--dropdown-default-text-color":  this.config.disabled ? this.disabledTextColor : this.textColor}
				];
			},
			computedClasses: function() {
				return {
					'expanded': this.isExpanded,
					'disabled': this.config.disabled
				}
			}
		},
		directives: {
			expand: {
				inserted: function (el, binding) {
					function calcHeight() {
						const currentState = el.getAttribute("aria-expanded");
						el.classList.add("u-no-transition");
						el.removeAttribute("aria-expanded");
						el.style.height = null;
						el.style.height = el.clientHeight + "px";
						el.setAttribute("aria-expanded", currentState);

						setTimeout(function () {
							el.classList.remove("u-no-transition");
						});
					}
					if (binding.value !== null) {
						el.classList.add("expand");
						el.setAttribute("aria-expanded", binding.value ? "true" : "false");
						calcHeight();
						window.addEventListener("resize", calcHeight);
					}
				},
				update: function (el, binding) {
					if (el.style.height && binding.value !== null) {
						el.setAttribute("aria-expanded", binding.value ? "true" : "false");
					}
				}
			}
		},
		methods: {
			setCurrentSelectedOption(option) {
				this.$emit("setSelectedOption", option);
			},
			setConfigData() {
				if (this.config) {
					this.configOptions = this.config.options;
					this.width = this.config.width;
					this.placeholder = this.config.placeholder;
					if (this.config.backgroundColor) {
						this.backgroundColor = this.config.backgroundColor;
					}
					if (this.config.backgroundExpandedColor) {
						this.backgroundExpandedColor = this.config.backgroundExpandedColor;
					}
					if (this.config.border) {
						this.border = this.config.border;
					}
					if (this.config.hoverBackgroundColor) {
						this.hoverBackgroundColor = this.config.hoverBackgroundColor;
					}
					if (this.config.textColor) {
						this.textColor = this.config.textColor;
					}
					if (this.config.borderRadius) {
						this.borderRadius = this.config.borderRadius;
					}
				}
			},
			setOptionsHeight() {
				this.optionsHeight = this.optionHeight * this.configOptions.length;
			},
			documentClicked() {
				if (this.isExpanded) {
					this.isExpanded = false
				}
			},
			shouldToggleDropdown() {
				if (!this.config.disabled) {
					this.isExpanded = !this.isExpanded;
				}
			},
		},
		created() {
			document.addEventListener('click', this.documentClicked);
			this.setConfigData();
			this.setOptionsHeight();
		},
		beforeUdate() {
			// this.setOptionsHeight();
		},
		destroyed() {
			document.removeEventListener('click', this.documentClicked);
		}
	};
</script>

<style scoped>
.dropdown {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	width: 180px;
	position: relative;
	border: 1px solid transparent;
	border-radius: 1.5em;
	cursor: pointer;
	color: black;
	background: green;
	user-select: none;
	transition: all 0.7s linear;
	.dropdown-label-container {
		display: flex;
		width: 100%;
		.dropdown-label {
			display: flex;
			justify-content: space-between;
			flex: 1 1 auto;
			align-items: center;
			height: 0px;
			padding: $option-padding;
			.text {
				font-family: "Source Sans Pro", sans-serif;
				font-size: 24px;
			}
			.angle-down {
				display: flex;
				justify-content: center;
				align-items: center;
				border: solid $default-text-color;
				background: transparent;
				border-width: 0 2px 2px 0;
				padding: 4px;
				width: 1px;
				height: 1px;
				margin: -3px 5px 0 0;
				border-color: black;
				transform: rotate(45deg);
				transition: all 0.7s;
			}
			.toggled {
				margin-bottom: -12px;
				transform: rotate(-135deg);
				transition: all 0.7s;
			}
		}
	}

	.options {
		width: 100%;
		.option {
			display: flex;
			align-items: center;
			padding: $option-padding;
			height: 35px;
			font-family: "Source Sans Pro", sans-serif;
			font-size: 18px;
		}
		.option:hover {
			color: $default-text-hover-color;
			background: $default-hover-color;
			transition: all 0.7s;
		}
		.option:last-child {
			border-radius: 0 0 1.5em	1.5em;
		}
		.option:last-child:hover {
			border-radius: 0 0 1.5em	1.5em;
		}
	}

	&.disabled {
		cursor: not-allowed;
	}
}
.dropdown.expanded {
	background: #fff;
	border: black;
	transition: all 0.7s linear;
}

.expand {
	overflow: hidden;
	transition-property: height;
	transition-duration: 0.4s;
	transition-timing-function: cubic-bezier(
									0.175,
									0.885,
									0.32,
									1.275
	);

	&[aria-expanded="false"] {
		height: 0 !important;
		transition-timing-function: cubic-bezier(
										0.6,
										-0.28,
										0.735,
										0.045
		);
	}
}
</style>
