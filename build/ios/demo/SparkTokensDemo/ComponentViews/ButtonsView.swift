//
//  ButtonsView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct MainButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(Size.buttonPadding)
            .background(
                configuration.isPressed ? Color.buttonMainActiveBackgroundColor : Color.buttonMainBackgroundColor)
            .foregroundColor(
                configuration.isPressed ? Color.buttonMainActiveColor : Color.buttonMainColor)
            .clipShape(RoundedRectangle(cornerRadius: Size.buttonBorderRadius))
            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct SupportButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(Size.buttonPadding)
            .border(
                configuration.isPressed ? Color.buttonSupportActiveBorderColor : Color.buttonSupportBorderColor,
                width: Size.buttonSupportBorderWidth)
            .background(
                configuration.isPressed ? Color.buttonSupportActiveBackgroundColor : Color.buttonSupportBackgroundColor)
            .foregroundColor(
                configuration.isPressed ? Color.buttonSupportActiveColor : Color.buttonSupportColor)
            .clipShape(RoundedRectangle(cornerRadius: Size.buttonBorderRadius))
            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct ButtonsView: View {
    var body: some View {
        VStack(spacing: 20) {
            Button("Main") {
                print("Main Button pressed")
            }.buttonStyle(MainButton())
            Button("Support") {
                print("Support Button pressed")
            }.buttonStyle(SupportButton())
        }
        .navigationBarTitle("Buttons")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandMainOnMain)
        .edgesIgnoringSafeArea(.all)
    }
}
