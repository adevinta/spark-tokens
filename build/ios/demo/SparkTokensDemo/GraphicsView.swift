//
//  GraphicsView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens


struct GraphicsView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Image.empty
                        .resizable()
                        .scaledToFit()
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .padding(.bottom, Size.paddingMd)
                    Image.files
                        .resizable()
                        .scaledToFit()
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .padding(.bottom, Size.paddingMd)
                }.lineSpacing(50)
                .padding(Size.paddingXl)
            }
        }
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandPrimaryOnPrimary)
    }
}
