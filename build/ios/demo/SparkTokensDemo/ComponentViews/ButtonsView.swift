//
//  ButtonsView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct PrimaryButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(Size.buttonPadding)
            .background(
                configuration.isPressed ? Color.buttonPrimaryActiveBackgroundColor : Color.buttonPrimaryBackgroundColor)
            .foregroundColor(
                configuration.isPressed ? Color.buttonPrimaryActiveColor : Color.buttonPrimaryColor)
            .clipShape(RoundedRectangle(cornerRadius: Size.buttonBorderRadius))
            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct SecondaryButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(Size.buttonPadding)
            .border(
                configuration.isPressed ? Color.buttonSecondaryActiveBorderColor : Color.buttonSecondaryBorderColor,
                width: Size.buttonSecondaryBorderWidth)
            .background(
                configuration.isPressed ? Color.buttonSecondaryActiveBackgroundColor : Color.buttonSecondaryBackgroundColor)
            .foregroundColor(
                configuration.isPressed ? Color.buttonSecondaryActiveColor : Color.buttonSecondaryColor)
            .clipShape(RoundedRectangle(cornerRadius: Size.buttonBorderRadius))
            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct ButtonsView: View {
    var body: some View {
        VStack(spacing: 20) {
            Button("Primary") {
                print("Primary Button pressed")
            }.buttonStyle(PrimaryButton())
            Button("Secondary") {
                print("Secondary Button pressed")
            }.buttonStyle(SecondaryButton())
        }
        .navigationBarTitle("Buttons")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandPrimaryOnPrimary)
        .edgesIgnoringSafeArea(.all)
    }
}
